// js/admin.js
// ВАЖНО: перед использованием замените переменные SUPABASE_URL и SUPABASE_ANON_KEY
const SUPABASE_URL = "https://tluqrkebiubwzweeytfl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdXFya2ViaXVid3p3ZWV5dGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODEzNDgsImV4cCI6MjA3ODQ1NzM0OH0.U27ToqoSig7dwubANsXJVvyHQwtStjb1s88EnEuzyXs";

const supabase = supabaseJs.createClient
  ? supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // backup

const el = id => document.getElementById(id);
const message = el('message');

async function uploadImage(file) {
  if (!file) return null;
  const fileName = Date.now().toString() + "-" + file.name.replace(/\s+/g, "_");
  const bucket = 'vehicle-images'; // имя bucket'а в Supabase Storage
  // Загружаем
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  });
  if (error) throw error;
  // Получаем публичный URL (предполагается, что bucket публичный)
  const { publicURL, error: urlErr } = supabase.storage.from(bucket).getPublicUrl(fileName);
  if (urlErr) throw urlErr;
  return publicURL;
}

async function saveVehicle() {
  message.textContent = '';
  const category = el('category').value;
  const title = el('title').value.trim();
  const subtitle = el('subtitle').value.trim();
  const description = el('description').value.trim();
  const specsText = el('specs').value.trim();
  const fileInput = el('image-file');
  const file = fileInput.files && fileInput.files[0];

  if (!title) {
    message.className = 'error';
    message.textContent = 'Введите название.';
    return;
  }

  message.className = '';
  message.textContent = 'Загрузка...';

  try {
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file);
    }

    let specs = null;
    try {
      specs = specsText ? JSON.parse(specsText) : null;
    } catch (e) {
      message.className = 'error';
      message.textContent = 'Неправильный JSON в характеристиках.';
      return;
    }

    const payload = {
      category, title, subtitle, description,
      image_url: imageUrl,
      specs
    };

    const { data, error } = await supabase
      .from('vehicles')
      .insert([payload])
      .select();

    if (error) {
      throw error;
    }

    message.className = 'notice';
    message.textContent = 'Успешно сохранено: ' + (data && data[0] ? data[0].id : '');

    // Очистим форму
    el('title').value = '';
    el('subtitle').value = '';
    el('description').value = '';
    el('specs').value = '';
    fileInput.value = '';

  } catch (err) {
    console.error(err);
    message.className = 'error';
    message.textContent = 'Ошибка: ' + (err.message || JSON.stringify(err));
  }
}

document.getElementById('btn-save').addEventListener('click', saveVehicle);
