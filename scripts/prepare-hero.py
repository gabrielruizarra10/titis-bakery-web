"""Separate the owner-supplied flattened hero; all processing stays local.

python -m pip install --target tmp/hero-tools opencv-python-headless==5.0.0.93 vtracer==0.6.15
python scripts/prepare-hero.py /path/to/hero-original.png
"""
from pathlib import Path
import sys, json, re
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tmp/hero-tools'))
import cv2
import numpy as np
import vtracer
from PIL import Image

OUT = ROOT / 'assets/hero'
DESIGN = ROOT / 'design/hero'
OUT.mkdir(parents=True, exist_ok=True)
DESIGN.mkdir(parents=True, exist_ok=True)
source = Path(sys.argv[1]) if len(sys.argv) > 1 else DESIGN / 'hero-original.png'
original = Image.open(source).convert('RGB')
original.save(DESIGN / 'hero-original.png')
original.crop((420,66,604,302)).save(DESIGN / 'logo-original-crop.png')
rgb = np.array(original)
assert rgb.shape[:2] == (572, 1024), 'Recheck crop coordinates for a different source.'

# Cream is distinct from all chocolate highlights; preserve the threshold evidence.
cream = ((rgb[:,:,0] > 215) & (rgb[:,:,1] > 190) & (rgb[:,:,2] > 165)).astype('uint8') * 255
Image.fromarray(cream).save(DESIGN / 'cream-mask.png')
logo_box = (420, 66, 604, 302)
x0,y0,x1,y1 = logo_box
logo_mask = cream[y0:y1,x0:x1].copy()
Image.fromarray(logo_mask).save(DESIGN / 'logo-cream-mask.png')
count, labels, stats, _ = cv2.connectedComponentsWithStats(logo_mask)
print('Logo components:', [(i, list(map(int,stats[i]))) for i in range(1,count) if stats[i,4]>3])

# Fill the face too: its dark outlines/features must not survive the inpaint.
remove = cream.copy()
contours,_ = cv2.findContours(logo_mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
logo_silhouette = np.zeros_like(logo_mask)
cv2.drawContours(logo_silhouette,contours,-1,255,cv2.FILLED)
remove[y0:y1,x0:x1] = logo_silhouette
remove = cv2.dilate(remove,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
Image.fromarray(remove).save(DESIGN / 'inpaint-mask.png')
bgr = cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR)
telea = cv2.inpaint(bgr, remove, 9, cv2.INPAINT_TELEA)
ns = cv2.inpaint(bgr, remove, 9, cv2.INPAINT_NS)
for name, arr in [('telea',telea),('ns',ns)]:
    Image.fromarray(cv2.cvtColor(arr,cv2.COLOR_BGR2RGB)).save(DESIGN / (name+'-review.jpg'), quality=93)

# Broad missing areas need actual frosting texture, not a blurred extrapolation.
# Poisson blend clean, owner-supplied texture patches over those regions.
textured = bgr.copy()
face_patch = bgr[60:310,210:410].copy()
face_blend = np.zeros((250,200),dtype=np.uint8)
cv2.rectangle(face_blend,(5,5),(194,244),255,-1)
textured = cv2.seamlessClone(face_patch,textured,face_blend,(512,184),cv2.NORMAL_CLONE)
text_patch = bgr[439:559,242:782].copy()
text_blend = np.zeros((120,540),dtype=np.uint8)
cv2.rectangle(text_blend,(8,8),(532,112),255,-1)
textured = cv2.seamlessClone(text_patch,textured,text_blend,(512,360),cv2.NORMAL_CLONE)
Image.fromarray(cv2.cvtColor(textured,cv2.COLOR_BGR2RGB)).save(DESIGN / 'textured-review.jpg',quality=94)

target = bgr[59:309,412:612].copy()
border = np.full((250,200),255,dtype=np.uint8)
border[22:-22,22:-22]=0
border[remove[59:309,412:612]>0]=0
scores = cv2.matchTemplate(bgr,target,cv2.TM_SQDIFF,mask=border)
ranked = []
for sy in range(0,323,5):
    for sx in range(0,825,5):
        if np.any(remove[sy:sy+250,sx:sx+200]): continue
        ranked.append((float(scores[sy,sx]),sx,sy))
ranked.sort()
selected=[]
for score,sx,sy in ranked:
    if any(abs(sx-px)+abs(sy-py)<110 for px,py in selected):continue
    selected.append((sx,sy))
    candidate = cv2.seamlessClone(bgr[sy:sy+250,sx:sx+200],textured,face_blend,(512,184),cv2.NORMAL_CLONE)
    Image.fromarray(cv2.cvtColor(candidate,cv2.COLOR_BGR2RGB)).save(DESIGN / f'candidate-{len(selected)}.jpg',quality=94)
    if len(selected)==3:break
print('Texture candidate coordinates:',selected)

# A color-vector trace of the clean threshold reproduces the original outline,
# rather than replacing the face with an invented drawing.
trace_input = np.full((236,184,3),255,dtype=np.uint8)
trace_input[logo_mask>0]=0
Image.fromarray(trace_input).save(DESIGN / 'trace-input.png')
vtracer.convert_image_to_svg_py(str(DESIGN / 'trace-input.png'),str(DESIGN / 'trace-raw.svg'),
    colormode='binary',mode='spline',filter_speckle=2,corner_threshold=75,
    length_threshold=3.0,max_iterations=10,splice_threshold=45,path_precision=2)
print('Wrote threshold, inpainting candidates and initial trace for review.')

def paths_for(mask, fill, part):
    """VTracer follows actual raster boundaries; no manual facial drawing."""
    path = DESIGN / ('trace-'+part+'.png')
    Image.fromarray(255-mask).save(path)
    vector = DESIGN / ('trace-'+part+'.svg')
    vtracer.convert_image_to_svg_py(str(path),str(vector),colormode='binary',mode='spline',
        filter_speckle=1,corner_threshold=80,length_threshold=2.0,
        max_iterations=10,splice_threshold=45,path_precision=2)
    xml=ET.parse(vector).getroot()
    result=[]
    for el in xml:
        if el.tag.endswith('path'):
            result.append('<path d="'+el.attrib['d'].strip()+'" transform="'+el.attrib.get('transform','translate(0,0)')+'" fill="'+fill+'"/>')
    return ''.join(result)

# Split the bow along the actual upper edge of the head; none of the eyes/mouth
# are reinterpreted. Layer boundaries stay in the source pixel coordinate space.
bow_region=np.zeros_like(logo_mask)
cv2.fillPoly(bow_region,[np.array([(0,0),(184,0),(184,47),(118,47),(104,46),(88,47),(73,50),(58,56),(45,65),(34,79),(29,86),(0,100)])],255)
bow=cv2.bitwise_and(logo_mask,bow_region)
edge=cv2.bitwise_and((labels==1).astype('uint8')*255,cv2.bitwise_not(bow_region))
inner=(labels==2).astype('uint8')*255
body=np.zeros_like(inner)
contours,_=cv2.findContours(inner,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(body,contours,-1,255,cv2.FILLED)
features=cv2.bitwise_and(body,cv2.bitwise_not(inner))
feature_count,feature_labels,feature_stats,centers=cv2.connectedComponentsWithStats(features)
parts={key:np.zeros_like(inner) for key in ['hair','eyes','mouth','details']}
for i in range(1,feature_count):
    x,y,w,h,area=feature_stats[i];cx,cy=centers[i]
    if area<2:continue
    key='hair' if cy<120 else 'eyes' if 122<cy<165 else 'mouth' if cy>177 else 'details'
    parts[key][feature_labels==i]=255
    print('Feature:',key,list(map(int,feature_stats[i])))

cream_color='#fef5e6'; dark_color='#3a261c'
body_paths=paths_for(body,cream_color,'face')
edge_paths=paths_for(edge,cream_color,'outline')
bow_paths=paths_for(bow,cream_color,'bow')
feature_paths={key:paths_for(mask,dark_color,key) for key,mask in parts.items() if np.any(mask)}

# A dark silhouette under the face keeps the original dark line distinct from
# the chocolate; bow loops remain genuinely transparent.
underlay_mask=np.zeros_like(inner)
face_edge=cv2.bitwise_or(edge,body)
face_contours,_=cv2.findContours(face_edge,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(underlay_mask,face_contours,-1,255,cv2.FILLED)
underlay_paths=paths_for(underlay_mask,dark_color,'underlay')

full_face=cv2.bitwise_and(logo_mask,cv2.bitwise_not(bow_region))
full_face_paths=paths_for(full_face,cream_color,'full-face')
fill_group='<g class="intro-logo-fill">'+underlay_paths+'<g id="titi-face">'+full_face_paths+'</g>'
fill_group+='</g><g id="titi-bow" class="intro-logo-fill intro-bow">'+bow_paths+'</g>'

# Drawing uses true traced paths. Filled paths are copied as stroke-only paths;
# it is the sole paint-property exception to the composite-only choreography.
def drawing(paths,part,delay):
    outlined=re.sub(r' fill="[^"]+"','',paths)
    outlined=outlined.replace('<path ','<path pathLength="1" ')
    return '<g class="intro-draw intro-draw-'+part+'" style="--draw-at:'+delay+'s">'+outlined+'</g>'
draw_group='<g class="intro-logo-drawing" opacity="0" fill="none" stroke="'+cream_color+'" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">'
draw_group+=drawing(edge_paths,'outline','0.5')+drawing(bow_paths,'bow','0.78')+drawing(body_paths,'hairline','1.02')
for key in ['hair','eyes','details','mouth']:
    if key in feature_paths:draw_group+=drawing(feature_paths[key],key,{'hair':'1.02','eyes':'1.17','details':'1.28','mouth':'1.38'}[key])
draw_group+='</g>'
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 236" width="184" height="236" aria-hidden="true" focusable="false">'+fill_group+draw_group+'</svg>'
(OUT/'logo-titi.svg').write_text(svg,encoding='utf-8')

# Render the SVG over the original for a pixel-aligned comparison. The final
# still retains the source cream/dark palette, not a generated face.
try:
    import fitz
    pix=fitz.open(stream=svg.encode(),filetype='svg').get_page_pixmap(0,alpha=True)
    rendered=Image.frombytes('RGBA',(pix.width,pix.height),pix.samples)
    source_crop=original.crop(logo_box).convert('RGBA')
    overlay=Image.blend(source_crop,rendered.resize(source_crop.size),.5)
    panel=Image.new('RGB',(184*3,236),(42,21,16))
    panel.paste(source_crop,(0,0));panel.paste(rendered,(184,0),rendered);panel.paste(overlay,(368,0))
    panel.resize((1104,472)).save(DESIGN/'logo-comparison.png')
    rendered.save(DESIGN/'logo-vector-render.png')
except ImportError:
    print('MuPDF unavailable: inspect the SVG in the browser.')

# Final clean plate: built-in image edit after local inpainting left seams.
# Its provenance/prompt is recorded in design/hero/README.md.
clean_path=DESIGN/'bg-retouched.png'
if clean_path.exists():
    clean=Image.open(clean_path).convert('RGB')
    desktop=clean.resize((2400,1341),Image.Resampling.LANCZOS)
    from PIL import ImageOps
    mobile_bg=ImageOps.fit(clean,(1200,2133),Image.Resampling.LANCZOS,centering=(.52,.5))
    for name,image in [('bg-betun.webp',desktop),('bg-betun-mobile.webp',mobile_bg)]:
        image.save(OUT/name,format='WEBP',quality=69,method=6)
        print(name,image.size,(OUT/name).stat().st_size)
print('SVG bytes:',(OUT/'logo-titi.svg').stat().st_size)
