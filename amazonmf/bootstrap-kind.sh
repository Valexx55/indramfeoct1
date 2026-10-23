#!/usr/bin/env bash
set -e

CLUSTER_NAME="indramfe"

echo "==> Borrando cluster anterior si existe..."
kind delete cluster --name "${CLUSTER_NAME}" || true

echo "==> Creando cluster kind..."
kind create cluster --config kind-config.yaml

echo "==> Creando namespace mfe..."
kubectl create namespace mfe || true

echo "==> Instalando ingress-nginx..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml


echo "==> Esperando a que ingress-nginx esté listo..."
kubectl rollout status deployment/ingress-nginx-controller -n ingress-nginx --timeout=180s

echo "==> Cargando imágenes en kind..."
kind load docker-image imf/shell:latest --name "${CLUSTER_NAME}"
kind load docker-image imf/productos:latest --name "${CLUSTER_NAME}"
kind load docker-image imf/carrito:latest --name "${CLUSTER_NAME}"
kind load docker-image imf/perfil:latest --name "${CLUSTER_NAME}"

echo "==> Aplicando manifiestos..."
kubectl apply -f k8-mfes.yaml
kubectl apply -f k8-ingress.yaml

echo "==> Estado final:"
kubectl get pods -n ingress-nginx
kubectl get all -n mfe
kubectl get ingress -n mfe