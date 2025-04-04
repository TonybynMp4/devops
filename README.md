# Location de voiture

Ce projet est un service de location de voiture développé en Node.js. Le service est déployable à l'aide de Docker et Kubernetes.

## Fonctionnalités clés

- **Endpoints API**:
  - Lister toutes les voitures.
  - Récupérer les détails d'une voiture spécifique par son numéro d'immatriculation.
  - Mettre à jour les dates de location d'une voiture.
- **Front-End**:
  - Voir les voitures disponibles et leur statut de location.
  - Louer une voiture en spécifiant les dates de location.
  - Réinitialiser le statut de location d'une voiture.
- **Dockerizée**:  déployable à l'aide de Docker.
- **Déploiement Kubernetes**: Inclut la configuration pour déployer le service dans un cluster Kubernetes avec Istio.

## Prérequis

- Node.js
- Docker (optionnel)
- Kubernetes (optionnel)
- Istio (optionnel)

## Installation

1. Clonez le repository:
```bash
   git clone https://github.com/tonybynmp4/rental/devops
   cd rental-service
```
2. Naviguez dans le répertoire **/app** et installez les dépendances:
```bash
    cd app
    npm install
```
3. Lancer l'application:
Localement :
    1. Lancez le serveur Node.js:
    ```bash
    npm start
    ```
    2. Ouvrez votre navigateur et allez à `http://localhost:4000` pour accéder à l'interface frontale.

Avec Docker :
1. Build the Docker image:
```bash
    docker build -t rentalservice .
```
2. Exécutez le conteneur Docker :
```bash
    docker run -p 4000:4000 rentalservice
```
3. Ouvrez votre navigateur et allez à `http://localhost:4000` pour accéder à l'interface.

Avec Kubernetes :
1. Assurez-vous d'avoir `kubectl` et `Istio` installés et configurés.
2. Déployez le service dans Kubernetes:
```bash
    kubectl create deployment rentalservice --image=tonybynmp4/rentalservice:1
```

2. Déployez le service dans Kubernetes:
```bash
    kubectl apply -f deployment.yaml
```
3. Créez la gateway:
```bash
    kubectl -n istio-system port-forward deployment/istio-ingressgateway 31380:8080
```
4. Ouvrez votre navigateur et allez à `http://localhost:31380` pour accéder à l'interface via la gateway Istio.

## Endpoints d'API
- **GET /api/cars**: Récupérer toutes les voitures.
- **GET /api/cars/:numberPlate**: Récupérer une voiture spécifique par son numéro d'immatriculation.
- **PUT /api/cars/:numberPlate**: Mettre à jour les dates de location d'une voiture.