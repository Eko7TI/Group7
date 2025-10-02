import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical

# Carregar o conjunto de dados MNIST
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Pré-processar os dados
x_train = x_train / 255.0
x_test = x_test / 255.0

# Transformar as labels para one-hot encoding
y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)

# Construir o modelo
model = Sequential([
    Flatten(input_shape=(28, 28)),  # Achata a entrada de 28x28 para 784
    Dense(128, activation='relu'),  # Primeira camada densa com 128 neurônios
    Dense(10, activation='softmax') # Camada de saída com 10 neurônios para 10 classes
])

# Compilar o modelo
model.compile(optimizer='adam', 
              loss='categorical_crossentropy', 
              metrics=['accuracy'])

# Treinar o modelo
model.fit(x_train, y_train, epochs=5, batch_size=32)

# Avaliar o modelo
test_loss, test_acc = model.evaluate(x_test, y_test)

print(f'\nAcurácia no conjunto de teste: {test_acc:.4f}')
