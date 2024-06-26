pipeline{
  agent any
  environment{
    registry = "yobubble62/go-hello-world"
  }
  stages{
    stage("Ensure Docker is working"){
      steps{
        sh 'docker ps'
      }
    }
    stage("Testing"){
      steps{
        sh "Test passed"
      }
    }
    stage("Docker Image Build"){
      steps{
        sh "docker build -t ${registry}:${env.BUILD_NUMBER} ."
      }
    }
    stage("Push To DockerHub"){
      steps{
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUsername')]) {
          sh "docker login -u ${env.dockerHubUsername} -p ${env.dockerHubPassword}"
          sh "docker push ${registry}:${env.BUILD_NUMBER}"
          sh "docker push ${registry}:latest"
        }
      }
    }
    stage("Test & Run Ansible"){
      steps{
        sh "ansible-playbook --syntax-check ansible_start/playbook.yaml"
      }
    }
    stage("Run Ansible to setup Docker and Kubernetes") // right now only Docker
      steps{
        sh "ansible-playbook -i hosts ansible_start/playbook.yaml"
      }
  }
  post{
      always{
        sh "docker rmi ${registry}:${env.BUILD_NUMBER}"
        echo "Sucessfully Remove ${registry}:${env.BUILD_NUMBER}"
      }
      success{
          echo "Pipeline Executed Sucessfully"
      }
      failure{
          echo "Pipeline Executed Failed"
      }
  }
}