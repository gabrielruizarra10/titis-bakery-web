export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function validateOrder(data, today = localDateKey()) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = 'Escribe tu nombre para que sepamos cómo llamarte.';
  const digits = (data.phone || '').replace(/\D/g,'');
  if (digits.length < 8 || digits.length > 15) errors.phone = 'Escribe un WhatsApp válido, con código de país si corresponde.';
  const parsed = new Date(`${data.date}T12:00:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date || '') || Number.isNaN(parsed.getTime()) || localDateKey(parsed) !== data.date) errors.date = 'Elige la fecha de tu celebración.';
  else if (data.date < today) errors.date = 'La fecha ya pasó. Elige hoy o una fecha futura.';
  if (!data.occasion) errors.occasion = 'Elige qué vamos a celebrar.';
  const portions = Number(data.portions);
  if (!Number.isInteger(portions) || portions < 1 || portions > 1000) errors.portions = 'Indica entre 1 y 1000 porciones aproximadas.';
  return errors;
}
export function buildMessage(data, photoName = '') {
  const safe = (value, limit=700) => String(value || '').trim().slice(0,limit);
  const [year,month,day] = safe(data.date).split('-');
  return ["Hola, Titi’s. Quisiera cotizar un pastel hecho para mi celebración.", '',
    `Nombre: ${safe(data.name,80)}`, `WhatsApp: ${safe(data.phone,25)}`,
    `Fecha: ${day}/${month}/${year}`, `Celebración: ${safe(data.occasion,80)}`,
    `Porciones aproximadas: ${safe(data.portions,5)}`, `Sabor: ${safe(data.flavor,160) || 'Lo decidimos juntas'}`,
    `Diseño o decoración: ${safe(data.design) || 'Me gustaría conversar sobre las opciones'}`,
    `Necesidades alimenticias / ingredientes a evitar: ${safe(data.diet,500) || 'Sin indicaciones por ahora'}`,
    ...(photoName ? [`Foto de inspiración: adjuntaré ${safe(photoName,150)} en este chat.`] : []), '',
    '¿Podemos revisar disponibilidad, ingredientes, precio y detalles de entrega? Entiendo que esta consulta no confirma ni reserva el pedido.'
  ].join('\n');
}
