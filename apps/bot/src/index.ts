console.log("Hello world! 🏎️");

import { ErgastClient } from "@/api";

const ergast = new ErgastClient();

ergast.drivers.get(2024).then((data) => {
  console.log(data.length);
});
