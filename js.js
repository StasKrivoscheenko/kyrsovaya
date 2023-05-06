function caesar_cipher(text, shift) {
    // Реалізація Шифру Цезаря
    var result = "";
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
      } else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }

  function atbash_cipher(text) {
    // Реалізація шифру Атбаш
    var result = "";
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(90 - (c - 65));
      } else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(122 - (c - 97));
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }

  function trisemus_cipher(text, key) {
    // Реалізація шифру Трисемуса
    var result = "";
    var matrix = [];
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var i, j;

    // Створюємо матрицю ключа
    for (i = 0; i < key.length; i++) {
      matrix.push([]);
      for (j = 0; j < alphabet.length; j++) {
        matrix[i].push("");
      }
    }

    // Заповнюємо матрицю ключа символами алфавiту
    var index = 0;
    for (j = 0; j < alphabet.length; j++) {
      var letter = alphabet.charAt(j);
      if (key.indexOf(letter) == -1) {
        // Якщо символ не входить в ключ, додаємо його в матрицю
        matrix[index][j] = letter;
        index++;
        if (index == key.length) {
          // Якщо дiйшли до кiнця ключа, починаємо заповнювати слiдуючий рядок
          index = 0;
        }
      }
    }

    // Заповнюємо матрицю ключа символами ключа
    for (i = 0; i < key.length; i++) {
      matrix[i][alphabet.indexOf(key.charAt(i))] = key.charAt(i);
    }

    // Шифруємо текст
    for (i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      var row = -1;
      var col = -1;
      // знаходимо позицiю символа в матрицi
      for (j = 0; j < matrix.length; j++) {
        var index = matrix[j].indexOf(c.toUpperCase());
        if (index != -1) {
          row = j;
          col = index;
          break;
        }
      }
      if (row == -1 || col == -1) {
        // Символ не знайдено в матрицi, просто додаємо його в результат
        result += c;
      } else {
        // Шифруємо символ за допомогою матрицi ключа
        if (c == c.toUpperCase()) {
          result += matrix[row][(col + 1) % matrix[row].length];
        } else {
          result += matrix[row][(col + 1) % matrix[row].length].toLowerCase();
        }
      }
    }

    return result;
  }

  function encrypt() {
    var cipher = document.getElementById("cipher").value;
    var text = document.getElementById("text").value;
    var result = "";
    if (cipher == "caesar") {
      var shift = parseInt(prompt("Введіть здвиг (ціле число від 1 до 25):"));
      result = caesar_cipher(text, shift);
    } else if (cipher == "atbash") {
      result = atbash_cipher(text);
    } else if (cipher == "trisemus") {
      var key = prompt("Введіть ключ (літери алфавіту без повторень):");
      result = trisemus_cipher(text, key);
    }
    document.getElementById("result").value = result;
  }

  function decrypt() {
    var cipher = document.getElementById("cipher").value;
    var text = document.getElementById("text").value;
    var result = "";
    if (cipher == "caesar") {
      var shift = parseInt(prompt("Введіть здвиг (ціле число від 1 до 25):"));
      result = caesar_cipher(text, 26 - shift);
    } else if (cipher == "atbash") {
      result = atbash_cipher(text);
    } else if (cipher == "trisemus") {
      var key = prompt("Введіть ключ (літери алфавіту без повторень):");
      result = trisemus_cipher(text, key);
    }
    document.getElementById("result").value = result;
  }