"""Extract the supplied brand artwork and optimize family-supplied photos. No AI alteration."""
from pathlib import Path
import sys
from pypdf import PdfReader
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / 'assets'
assets.mkdir(exist_ok=True)
reader = PdfReader(sys.argv[1])
logo = reader.pages[2].images[0].image.convert('RGB')
# The PDF contains a flattened original logo. Preserve that original in the repository.
logo.save(assets / 'logo-original.jpg', quality=95)
print('Original logo:', logo.size)
# The original illustration occupies the upper portion; crop only, do not redraw her face.
box = logo.crop((int(logo.width*.32), 0, int(logo.width*.70), int(logo.height*.55)))
# Trim white padding while retaining the original white field and all illustration pixels.
from PIL import ImageChops
bounds = ImageChops.difference(box, Image.new('RGB', box.size, 'white')).convert('L').point(lambda x: 255 if x>35 else 0).getbbox()
if bounds: box = box.crop(bounds)
box.save(assets / 'titi-portrait.webp', quality=95)
photos = [('celebracion',sys.argv[2]),('pastel-flores',sys.argv[3]),('pie-casero',sys.argv[4])]
for name, source in photos:
    im = Image.open(source).convert('RGB')
    im.thumbnail((1600,1600))
    im.save(assets / (name+'.webp'), quality=86)
    print(name, im.size)
