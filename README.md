## Basic To-Do App (Expo + React Native)

### Türkçe (TR)

Bu proje, Expo ve React Native kullanarak yapılmış basit bir yapılacaklar (To-Do) uygulamasıdır. Aşağıda uygulamayı nasıl çalıştıracağınızı, ardından `app/(tabs)/index.tsx` dosyasındaki kritik noktaları adım adım, eğitim niteliğinde ve önemli kısımların altını çizerek anlatıyorum.

---

### Hızlı Başlangıç

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npx expo start
```

3. Expo Go ile cihazınızda veya emülatörde çalıştırın.

> Not: Proje kök dizini: `ToDoApp`. Ana ekran bileşeni `app/(tabs)/index.tsx`.

---

### Kodun Mantığı: `app/(tabs)/index.tsx`

#### 1) İçe aktarmalar ve başlangıç verisi
```1:3:app/(tabs)/index.tsx
import React, { useState } from 'react';
import { tasks as initialTasks } from '@/components/tasks';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
```
- **Önemli:** <u>`useState`</u> durum yönetimi için kullanılıyor.
- **Önemli:** <u>`initialTasks`</u>, başlangıç görev listesini içeriyor.
- **Önemli:** <u>`FlatList`</u> uzun listeleri verimli render etmek için.

#### 2) Durumlar (state) ve başlangıçları
```5:9:app/(tabs)/index.tsx
export default function HomeScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [items, setItems] = useState<string[]>(initialTasks);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialTasks.map(() => false));
```
- **Önemli:** <u>`taskInput`</u> metin kutusundaki mevcut değeri tutar.
- **Önemli:** <u>`items`</u> görünen görev listesidir.
- **Önemli:** <u>`checkedItems`</u>, her görevin tamamlanma durumunu paralel bir dizi olarak tutar (index eşleşir).

#### 3) Görev tamamlama ve silme akışı
```10:15:app/(tabs)/index.tsx
  const toggleCheckbox = (id: number) => {
    setCheckedItems(prev => prev.map((item, i) => i === id ? !item : item));
    if (checkedItems[id]) { 
      setItems(prev => prev.filter((item, i) => i !== id));
    }
  };
```
- **Önemli:** <u>`toggleCheckbox`</u> bir görevin durumunu tersine çevirir.
- **Çalışma Mantığı:** Eğer bir görev zaten işaretliyse (tamamsa), bu fonksiyon çağrıldığında <u>listeden kaldırılır</u> (silinir). Yani ikinci dokunuşta silme meydana gelir.
- İpucu: Daha net bir UX için "işaretle" ve "sil"i ayrı butonlara ayırabilirsiniz.

#### 4) Yeni görev ekleme akışı
```17:23:app/(tabs)/index.tsx
  const handleAddTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, trimmed]);
    setCheckedItems(prev => [...prev, false]);
    setTaskInput('');
  };
```
- **Önemli:** <u>`handleAddTask`</u> boşlukları kırpar, boşsa eklemez.
- **Önemli:** <u>`items`</u> ve <u>`checkedItems`</u> aynı anda güncellenir; her yeni görev için eşleşen bir `false` eklenir.

#### 5) Arayüz ve listeleme
```25:51:app/(tabs)/index.tsx
  return (
    <View style={styles.container}>
      <Text style={styles.myText}>Home</Text>
      <TextInput
        id="taskInput"
        placeholder="Enter your task"
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <Button
        title="Add Task"
        onPress={handleAddTask}
      />
      
      <FlatList
        style={styles.myFlatList}
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleCheckbox(index)}>
            <Text style={{ textDecorationLine: checkedItems[index] ? 'line-through' : 'none', color: checkedItems[index] ? 'red' : 'black' }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );
```
- **Önemli:** <u>`TextInput`</u> değeri <u>`taskInput`</u> ile kontrol ediliyor; değişim <u>`setTaskInput`</u>.
- **Önemli:** <u>`Button onPress={handleAddTask}`</u> ekleme akışını tetikler.
- **Önemli:** <u>`FlatList`</u> her öğe için bir satır üretir. Satıra dokununca <u>`toggleCheckbox(index)`</u> çalışır.
- **Görsel Durum:** Tamamlanan öğeler <u>üstü çizili</u> ve <u>kırmızı</u> gösterilir.

#### 6) Stil bilgisi
Stiller `StyleSheet.create` ile tanımlanır. Önemli olan, giriş ve liste bileşenlerinin genişlik/yükseklik ve kenar boşluklarının kullanıcı deneyimini iyileştirmesidir.

---

### Tasarım Kararları ve İpuçları
- **İndeks eşleşmesi:** `items` ve `checkedItems` dizilerini senkron tutmak için ekleme/silmede ikisini de güncelliyoruz.
- **Performans:** `FlatList` uzun listelerde performans sağlar. Daha ileri düzeyde `memo` veya `keyExtractor` stratejileri kullanılabilir.
- **Genişletme:** Kalıcı depolama için `AsyncStorage` veya bir durum kütüphanesi (Zustand/Redux) eklenebilir.

---

### English (EN)

This project is a simple To-Do app built with Expo and React Native. Below is how to run it, followed by a teach-by-example walkthrough of `app/(tabs)/index.tsx` with underlined key parts.

---

### Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npx expo start --tunnel
```

3. Run on a device/emulator via Expo Go.

> Note: Project root is `ToDoApp`. Main screen lives at `app/(tabs)/index.tsx`.

---

### Code Logic: `app/(tabs)/index.tsx`

#### 1) Imports and seed data
```1:3:app/(tabs)/index.tsx
import React, { useState } from 'react';
import { tasks as initialTasks } from '@/components/tasks';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
```
- **Key:** <u>`useState`</u> is used for state management.
- **Key:** <u>`initialTasks`</u> provides the starting list from `components/tasks.tsx`.
- **Key:** <u>`FlatList`</u> efficiently renders long lists.

#### 2) States and initial values
```5:9:app/(tabs)/index.tsx
export default function HomeScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [items, setItems] = useState<string[]>(initialTasks);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialTasks.map(() => false));
```
- **Key:** <u>`taskInput`</u> holds the current text field value.
- **Key:** <u>`items`</u> is the rendered task list.
- **Key:** <u>`checkedItems`</u> mirrors completion state per task by index.

#### 3) Complete and delete flow
```10:15:app/(tabs)/index.tsx
  const toggleCheckbox = (id: number) => {
    setCheckedItems(prev => prev.map((item, i) => i === id ? !item : item));
    if (checkedItems[id]) { 
      setItems(prev => prev.filter((item, i) => i !== id));
    }
  };
```
- **Key:** <u>`toggleCheckbox`</u> flips a task's completion state.
- **Behavior:** If the task is already checked, triggering this again <u>removes it from the list</u>. Second tap deletes.
- Tip: Consider separate actions for "complete" vs "delete" for clearer UX.

#### 4) Add task flow
```17:23:app/(tabs)/index.tsx
  const handleAddTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, trimmed]);
    setCheckedItems(prev => [...prev, false]);
    setTaskInput('');
  };
```
- **Key:** <u>`handleAddTask`</u> trims whitespace and skips empty entries.
- **Key:** Updates both <u>`items`</u> and <u>`checkedItems`</u> in sync; new tasks get a matching `false`.

#### 5) UI and rendering
```25:51:app/(tabs)/index.tsx
  return (
    <View style={styles.container}>
      <Text style={styles.myText}>Home</Text>
      <TextInput
        id="taskInput"
        placeholder="Enter your task"
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <Button
        title="Add Task"
        onPress={handleAddTask}
      />
      
      <FlatList
        style={styles.myFlatList}
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleCheckbox(index)}>
            <Text style={{ textDecorationLine: checkedItems[index] ? 'line-through' : 'none', color: checkedItems[index] ? 'red' : 'black' }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );
```
- **Key:** <u>`TextInput`</u> controlled by <u>`taskInput`</u>; updates via <u>`setTaskInput`</u>.
- **Key:** <u>`Button onPress={handleAddTask}`</u> triggers the add flow.
- **Key:** <u>`FlatList`</u> maps items to rows; tapping a row calls <u>`toggleCheckbox(index)`</u>.
- **Visual State:** Completed items are <u>struck-through</u> and <u>red</u>.

#### 6) Styling
Defined via `StyleSheet.create`. Input and list dimensions/margins are tuned for a simple, centered layout.

---

### Design Notes and Tips
- **Index coupling:** `items` and `checkedItems` are updated together to remain in sync.
- **Performance:** `FlatList` scales well; you can layer memoization and better keys as needed.
- **Extensibility:** Add persistence via `AsyncStorage` or a state library (Zustand/Redux).

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
