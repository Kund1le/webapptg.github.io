fetch('data.json')
.then(response => response.json())
.then(data => {
  const brands = [];
data.forEach(phone => {
  if (!brands.includes(phone.brandName)) {
    brands.push(phone.brandName);
  }
});

brands.sort();

const brandInput = document.getElementById('brandInput');
brands.forEach(brand => {
  const brandOption = document.createElement('option');
  brandOption.text = brand;
  brandOption.value = brand;
  brandInput.appendChild(brandOption);
});

  document.getElementById('brandInput').addEventListener('change', () => {
    const selectedBrand = document.getElementById('brandInput').value;
    const modelsDropdown = document.getElementById('modelInput');
    modelsDropdown.innerHTML = `<option value="">Модель</option>`;
    const uniqueModels = new Set();
    data.filter(phone => phone.brandName === selectedBrand).forEach(phone => {
      uniqueModels.add(phone.combined_name);
    });
    const sortedModels = Array.from(uniqueModels).sort();
    sortedModels.forEach(model => {
      const modelOption = document.createElement('option');
      modelOption.text = model;
      modelOption.value = model;
      modelsDropdown.appendChild(modelOption);
    });
  });
  document.getElementById('modelInput').addEventListener('change', () => {
    const selectedModel = document.getElementById('modelInput').value;
    const storageDropdown = document.getElementById('storageInput');
    storageDropdown.innerHTML = '<option value="">Память</option>';
    
    const memorySizes = data.filter(phone => phone.combined_name === selectedModel)
                            .map(phone => phone.memory_size)
                            .filter(memory => memory !== null)
                            .sort((a, b) => a - b);

    memorySizes.forEach(memorySize => {
        const storageOption = document.createElement('option');
        storageOption.text = memorySize;
        storageOption.value = memorySize;
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

  const brandSelect = document.getElementById('brandInput');
  const modelSelect = document.getElementById('modelInput');
  const storageSelect = document.getElementById('storageInput');
  const excellentBtn = document.getElementById('excellentBtn');
  const goodBtn = document.getElementById('goodBtn');
  const workerBtn = document.getElementById('workerBtn');
  const repairBtn = document.getElementById('repairBtn');
  const finalPrice = document.getElementById('final-price');

  function calculatePrice() {
    let price = '';
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedStorage = storageSelect.value;
    const selectedPhone = data.find(phone => phone.brandName === selectedBrand && phone.combined_name === selectedModel && phone.memory_size === selectedStorage !== null);

    if(selectedPhone) {
      if(excellentBtn.classList.contains('active')) {
        price = selectedPhone.buyout_price_b;
      } else if(goodBtn.classList.contains('active')) {
        price = selectedPhone.buyout_price_c;
      } else if(workerBtn.classList.contains('active')) {
        price = selectedPhone.buyout_price_d;
      } else if(repairBtn.classList.contains('active')) {
        const priceB = selectedPhone.buyout_price_b;
        const priceD = selectedPhone.buyout_price_d;
        const repairPriceRange = {
          min: (priceD * 80) / 100,
          max: (priceB * 80) / 100
        };
        price = `от ${repairPriceRange.min} до ${repairPriceRange.max}`;
      }
      finalPrice.textContent = 'Итоговая цена: ' + price;
    } else {
      finalPrice.textContent = 'Устройство не найдено'
    }
  }
  excellentBtn.addEventListener('click', () => {
    excellentBtn.classList.add('active');
    goodBtn.classList.remove('active');
    workerBtn.classList.remove('active');
    repairBtn.classList.remove('active');
    calculatePrice();
  });
  goodBtn.addEventListener('click', () => {
    goodBtn.classList.add('active');
    excellentBtn.classList.remove('active');
    workerBtn.classList.remove('active');
    repairBtn.classList.remove('active');
    calculatePrice();
  });
  workerBtn.addEventListener('click', () => {
    workerBtn.classList.add('active');
    excellentBtn.classList.remove('active');
    goodBtn.classList.remove('active');
    repairBtn.classList.remove('active');
    calculatePrice();
  });
  repairBtn.addEventListener('click', () => {
    repairBtn.classList.add('active');
    excellentBtn.classList.remove('active');
    goodBtn.classList.remove('active');
    workerBtn.classList.remove('active');
    calculatePrice();
  });
  calculatePrice();

  document.getElementById('resultButton').addEventListener('click', () => {
    document.getElementById('final-price').style.display = 'block';
    document.getElementById('resultButton').style.display = 'none';
    document.getElementById('requestButton').style.display = 'block';
  });

  function resetActiveButton() {
    document.querySelectorAll('.page_button').forEach(button => {
      button.classList.remove('active');
    });
    document.getElementById('final-price').style.display = 'none';
    document.getElementById('requestButton').style.display = 'none';
    document.getElementById('resultButton').style.display = 'block';
  }

  document.getElementById('brandInput').addEventListener('change', () => {
    resetActiveButton();
  });

  document.getElementById('modelInput').addEventListener('change', () => {
    resetActiveButton();
  });

  document.getElementById('storageInput').addEventListener('change', () => {
    resetActiveButton();
  })
})
.catch(error => console.log('Пошла ты', error));


let tg = window.Telegram.WebApp;

tg.expand();

const popupButton = document.getElementById('popup-button');

popupButton.addEventListener('click', () => {
  const token = '5078318939:AAG5ilp8YDGHzirehcm_2L1GqStKA5N1UzM';
  const chatId = window.Telegram.WebApp.openChatId;
  const userChatId = chatId
  const message = 'Какой-то сообщение';

  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${userChatId}&text=${message}`)
  .then(response => response.json())
  .then(data => {
    console.log('Сообщение отправлено', data);
  })
  .catch(error => console.error('Ошибка', error));
  window.close();
});