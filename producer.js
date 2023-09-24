const { kafka } = require("./client");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  rl.setPrompt(">");
  rl.prompt();
  rl.on("line", async function (line) {
    const [riderName, location] = line.split("");
    await producer.send({
      topic: "rider-updated-1",
      messages: [
        {
          key: "location-update",
          value: JSON.stringify({ 
            partition: location.toLowerCase() === 'north' ? 0 : 1,
            name: riderName,
            loc: location,
          }),
        },
      ],
    });
  }).on('close', async () => {
    await producer.disconnect();  
})  

//   await producer.send({
//     topic: "rider-updated-1",
//     messages: [
//       {
//         key: "location-update",
//         value: JSON.stringify({
//           partition: 0,
//           name: "Abhishek Verma",
//           loc: "Gorakhpur",
//         }),
//       },
//     ],
//   });

  await producer.disconnect();
}

init();
