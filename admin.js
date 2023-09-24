const { kafka } = require("./client.js");
async function init() {
  const admin = kafka.admin();
  console.log("Admin Connecting ::: ");
  admin.connect();
  console.log("Admin Connected Successfully");
  console.log("Topics Creation Start's");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updated-1",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topics Creation End's");
  console.log("Disconnecting Admin");
  await admin.disconnect();
}

async function createTopics(admin) {
  console.log("Topics Creation Start's");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updated",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topics Creation End's");
}

init();
