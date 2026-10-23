set -e

echo "Construyendo shell..."
docker build -t imf/shell:latest -f projects/shell/Dockerfile .

echo "Construyendo productos..."
docker build -t imf/productos:latest -f projects/productos/Dockerfile .

echo "Construyendo carrito..."
docker build -t imf/carrito:latest -f projects/carrito/Dockerfile .

echo "Construyendo perfil..."
docker build -t imf/perfil:latest -f projects/perfil/Dockerfile .

echo "Builds completadas."
~                           