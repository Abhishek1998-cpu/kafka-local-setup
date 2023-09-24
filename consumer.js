const { kafka } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });
  await consumer.connect();
  await consumer.subscribe({
    topics: ["rider-updated-1"],
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log("Topic ::: ", topic);
      console.log("Partition ::: ", partition);
      console.log("Message ::: ", message.value?.toString());
    },
  });
  //   console.log("Disconnecting Consumer");
  //   await consumer.disconnect();
  //   console.log("Consumer Disconnected Successfully");
}

init();
