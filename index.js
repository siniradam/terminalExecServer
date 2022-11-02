const { exec } = require("child_process");
const express = require("express");
const app = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Terminal Executer Ready.");
});

//Says done;
//$ say done

//Plays an audio
//$ afplay /System/Library/Sounds/Funk.aiff

//Pauses Spotify
//$ osascript -e 'tell application "Spotify" to pause'

//Mute Audio
//$ osascript -e 'set volume output muted true'
//UnMute Audio
//$ osascript -e 'set volume output muted false'

app.post("/", (req, res) => {
  const { command } = req.body;

  console.log("Command Received", command);
  //   return res.json({ status: "error", message: "Unrecognized command" });

  if (command == "sleep") {
    res.json({ status: "ok", message: "Sleeping." });
    exec("pmset sleepnow");
    //
  } else if (command == "turnoff") {
    res.json({ status: "ok", message: "Shutting down." });
    exec("shutdown -h now");
    //
  } else if (command == "fav") {
    res.json({ status: "ok", message: "Fav command executing." });
    exec("say hello");
    //
  } else {
    res.json({ status: "error", message: "Unrecognized command" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
