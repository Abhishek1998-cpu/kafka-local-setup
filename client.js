const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-example",
  brokers: ["192.168.29.123:9092"],
});

module.exports = { kafka };
