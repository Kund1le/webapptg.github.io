fetch('data.json')
.then(response => response.json())
.then(data => {
  const brands = [];
  data.forEach(phone => {
    if(!brands.includes(phone.brandName)) {
      brands.push(phone.brandName);
      const brandOption = document.createElement('option');
      brandOption.text = phone.brandName;
      brandOption.value = phone.brandName;
      document.getElementById('brandInput').appendChild(brandOption);
    }
  });
  document.getElementById('brandInput').addEventListener('change', () => {
    const selectedBrand = document.getElementById('brandInput').value;
    const modelsDropdown = document.getElementById('modelInput');
    modelsDropdown.innerHTML = `<option value="">Модель</option>`;
    const uniqueModels = new Set();
    data.filter(phone => phone.brandName === selectedBrand).forEach(phone => {
      uniqueModels.add(phone.combined_name);
    });
    uniqueModels.forEach(model => {
      const modelOption = document.createElement('option');
      modelOption.text = model;
      modelOption.value = model;
      modelsDropdown.appendChild(modelOption);
    });
  });
  document.getElementById('modelInput').addEventListener('change', () => {
    const selectedModel = document.getElementById('modelInput').value;
    const storageDropdown = document.getElementById('storageInput');
    storageDropdown.innerHTML = `<option value="">Память</option>`;
    data.filter(phone => phone.combined_name === selectedModel).forEach(phone => {
      const storageOption = document.createElement('option');
      storageOption.text = phone.memory_size;
      storageOption.value = phone.memory_size;
      storageDropdown.appendChild(storageOption);
    });
  });
  document.querySelectorAll('.page_button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelectorAll('.page_button').forEach(btn => {
        btn.classList.remove('active');
      });
      event.target.classList.add('active');
    });
  });
})
.catch(error => console.log('Пошла ты', error));