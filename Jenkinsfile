pipeline{
  agent any
  environment{
    registry = "yobubble62/go-hello-world"
  }
  stages{
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
          sh "docker tag ${registry}:${env.BUILD_NUMBER} ${registry}:latest"
          sh "docker push ${registry}:latest"
        }
      }
    }
    stage("Run Ansible to setup Docker and Kubernetes"){
      steps{
        sh "cd ansible"
        sh "ansible-playbook -i hosts playbook.yaml"
      }
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