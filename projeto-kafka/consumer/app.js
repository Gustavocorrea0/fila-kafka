const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });

// Configuração do tópico
const topics = [
  {
    topic: 'car_topic',
    partitions: 1,
    replicationFactor: 1
  }
];

// Cria o tópico
client.createTopics(topics, (error, result) => {
  if (error) {
    console.error('Erro ao criar o tópico:', error);
    return;
  }
  console.log('Tópico criado com sucesso:', result);
  
  // Inicia o consumidor
  startConsumer();
});

function startConsumer() {
  // Configuração do consumidor
  const consumer = new kafka.Consumer(
    client,
    [{ topic: 'car_topic', partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024
    }
  );

  consumer.on('message', function (message) {
    console.log('Consumed message:', message.value);
  });

  consumer.on('error', function (err) {
    console.error('Error consuming message:', err);
  });
}