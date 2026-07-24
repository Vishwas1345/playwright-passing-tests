pipeline {
    agent none

    environment {
        TESTDINO_TOKEN = credentials('TESTDINO_TOKEN')
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
    }

    triggers {
        // Poll SCM every 5 minutes, or remove this block and use a webhook instead
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Shard tests') {
            matrix {
                axes {
                    axis {
                        name 'SHARD'
                        values '1', '2', '3', '4'
                    }
                }
                agent {
                    docker {
                        image 'mcr.microsoft.com/playwright:v1.54.1-jammy'
                        args '--ipc=host'
                    }
                }
                environment {
                    TESTDINO_SERVER_URL = 'https://analytics.testdino.com'
                    // Same ciRunId across all shards -> one logical run in TestDino
                    TESTDINO_CI_RUN_ID = "${env.BUILD_TAG}"
                }
                stages {
                    stage('Run shard') {
                        steps {
                            sh 'npm ci'
                            sh "npx playwright test --shard=${SHARD}/4 || true"
                        }
                    }
                }
            }
        }
    }
}
