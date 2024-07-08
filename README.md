Three.js ve React-Three-Fiber ile 3D Shape Yönetimi
Bu proje, Three.js ve React-Three-Fiber kullanarak 3D şekillerin oluşturulması, yönetilmesi ve görüntülenmesi işlevselliğini sunar. Proje, kullanıcıların 3D şekilleri oluşturmasına, düzenlemesine, silmesine ve görüntülemesine olanak tanır.

sh
Kodu kopyala
yarn start
Kullanılan Teknolojiler
React: Kullanıcı arayüzünü oluşturmak için.
Three.js: 3D grafikler ve animasyonlar için.
React-Three-Fiber: React ile Three.js kullanımını kolaylaştırmak için.
MUI (Material UI): Kullanıcı arayüzü bileşenleri için.
Klasör Yapısı
scss
Kodu kopyala
src/
│
├── components/
│   ├── create-modal.tsx
│   ├── delete-modal.tsx
│   └── ... (diğer bileşenler)
│
├── containers/
│   ├── Home.tsx
│   ├── ThreeFiber.tsx
│   ├── Three.tsx
│   └── ... (diğer konteynerler)
│
├── context/
│   ├── render-mode-context.tsx
│   ├── shape-context.tsx
│   ├── three-js-context.tsx
│   └── ... (diğer context dosyaları)
│
├── hooks/
│   ├── use-shape-manager.tsx
│   └── ... (diğer hook dosyaları)
│
└── App.tsx
└── index.tsx
Önemli Dosyalar ve İşlevler
ThreeJSContainer
Bu bileşen, Three.js kullanarak 3D şekillerin oluşturulması ve yönetilmesi işlevselliğini sağlar.

initThree: Three.js sahnesini, kamerayı, ışıkları ve kontrolleri başlatır.
handleOpen, handleClose: Oluşturma modallerini açar ve kapatır.
handleDeleteModalOpen, handleDeleteModalClose: Silme modallerini açar ve kapatır.
handleRenderAll, handleRenderSingle: Tüm şekilleri veya tek bir şekli render eder.
handleCloseCanvas: Render modunu kapatır.
onCanvasClick: Mesh tıklamalarını işler.
ThreeFiberContainer
Bu bileşen, React-Three-Fiber kullanarak 3D şekillerin oluşturulması ve yönetilmesi işlevselliğini sağlar.

handleOpen, handleClose: Oluşturma modallerini açar ve kapatır.
handleDeleteModalOpen, handleDeleteModalClose: Silme modallerini açar ve kapatır.
handleRender: Tüm şekilleri render eder.
handleCloseCanvas: Render modunu kapatır.
Context Yönetimi
RenderModeContext
Render modunun yönetimini sağlar.

renderMode: Render modunu belirtir.
singleRender: Tek bir şeklin render edilip edilmeyeceğini belirtir.
ShapeContext
Şekillerin yönetimini sağlar.

shapes: Tüm şekillerin listesi.
selectedShape: Seçili şekil.
createShape: Yeni bir şekil oluşturur.
deleteShape: Bir şekli siler.
handleShapeSelect: Bir şekli seçer.
handleScaleChange: Bir şeklin ölçeğini değiştirir.
handlePositionChange: Bir şeklin konumunu değiştirir.
ThreeJSContext
Three.js ile ilgili referansları yönetir.

sceneRef: Three.js sahnesi.
cameraRef: Three.js kamerası.
rendererRef: Three.js renderleyicisi.
containerRef: Render container'ı.
meshRefs: Mesh referansları.
controlsRef: Orbit kontrolleri.
raycaster: Raycaster.
mouse: Mouse pozisyonu.
Kullanım
Şekil Oluşturma
Create butonuna tıklayın.
Şekil bilgilerini girin ve kaydedin.
Şekil Silme
Delete butonuna tıklayın.
Silme işlemini onaylayın.
Şekil Render Etme
Bir şekli render etmek için Render butonuna tıklayın.
Tüm şekilleri render etmek için Render All butonuna tıklayın.
Render Modundan Çıkma
Close butonuna tıklayın.
Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Ayrıntılar için LICENSE dosyasına bakabilirsiniz.