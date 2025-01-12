pipeline {
    agent any

    environment {
        FRONTEND_DIST_PATH = '/var/www/html/projects/PC-Clone-Frontend'
        DOCKER_COMPOSE_FILE = 'docker-compose-deploy.yml'
        FRONTEND_CONTAINER_NAME = 'pc-componentes-clone-frontend-1'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/TeRacksito/PC-Componentes-Clone.git'
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    sh 'docker-compose -f $DOCKER_COMPOSE_FILE build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                  sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
                }
            }
        }

        stage('Deploy Frontend to Apache') {
            steps {
                script {
                    sh """
                        docker cp $FRONTEND_CONTAINER_NAME:/usr/src/app/frontend/dist $FRONTEND_DIST_PATH/
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
