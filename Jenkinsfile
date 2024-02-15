pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[credentialsId: 'Github_config', url: 'https://github.com/Andriy-1/school-front-end.git']]
                )
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t andriyhomee/school_frontend:latest -f ./Dockerfile.dev .'
                }
            }
        }
        stage('Publish Docker Image') {
            steps {
                script {
                    
                   withDockerRegistry(credentialsId: 'dockerhub-cred-andriyhomee', url: 'https://index.docker.io/v1/') {
					sh 'docker push andriyhomee/school_frontend:latest'
					}
                }
            }
   		}
        stage('Start docker container frontend') {
            steps {
                script {
                    sh 'docker stop frontend-jenkins'
                    sh 'docker rm frontend-jenkins'
                    sh 'docker run -d -p 3000:3000 --name frontend-jenkins andriyhomee/school_frontend:latest'
                
                }
            }
        }
       
    }
}