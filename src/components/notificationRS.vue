<template>
  <b-container>
    <h2 class="text-center">Notification Monitoring</h2>
    <br /><br />
    <h5><b>Notification Message</b></h5>

    <v-card class="pa-10" outlined shaped elevation="3">
      <b-row>
        <b-form-textarea
          id="log"
          v-model="console_text_message"
          rows="20"
          max-rows="20"
        ></b-form-textarea>
      </b-row>
    </v-card>
  </b-container>
</template>

<script>
import axios from "axios";
import { mixin as VueTimers } from "vue-timers";
import mqtt from "mqtt";
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      console_text_message: "",

      response_text: "",
      connected: false,
      rev_connted: false,

      // noti를 받기 위한 포트
      host: "127.0.0.1",
      port: "7579",

      client: {
        connected: false,
        loading: false,
      },
      connection: {
        //mqtt 연결을 위한 포트
        host: "127.0.0.1",
        port: 8883,
        endpoint: "",
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: "jiho_" + nanoid(15),
        username: "keti_muv",
        password: "keti_muv",
      },
    };
  },
  mixins: [VueTimers],
  timers: {
    getData: { time: 1000, repeat: true },
  },
  methods: {
    onMessageHandler(topic, message) {
      let chkTopic = topic.substr(0, 7);

      if (chkTopic === "/oneM2M") {
        var jsonObj = JSON.parse(message.toString());

        if (jsonObj["m2m:rqp"] == null) {
          jsonObj["m2m:rqp"] = jsonObj;
        }

        if (Object.prototype.hasOwnProperty.call(jsonObj["m2m:rqp"], "pc")) {
          // console.log(Object.keys(jsonObj['m2m:rqp'].pc)[0]);
          // console.log(jsonObj['m2m:rqp'].pc);

          let arr_topic = topic.split("/");
          let resp_topic = topic.replace("/req/", "/resp/");
          let rsp_message = {};
          rsp_message["m2m:rsp"] = {};
          rsp_message["m2m:rsp"].rsc = 2001;
          rsp_message["m2m:rsp"].to = "";
          rsp_message["m2m:rsp"].fr = arr_topic[4];
          rsp_message["m2m:rsp"].rqi = "12345";
          rsp_message["m2m:rsp"].pc = "";

          //console.log(resp_topic);

          this.doPublish(resp_topic, JSON.stringify(rsp_message["m2m:rsp"]));

          rsp_message = null;

          //sgn - noti > jsonObj print
          if (
            Object.prototype.hasOwnProperty.call(
              jsonObj["m2m:rqp"].pc,
              "m2m:sgn"
            )
          ) {
            if (
              Object.prototype.hasOwnProperty.call(
                jsonObj["m2m:rqp"].pc["m2m:sgn"],
                "nev"
              )
            ) {
              if (
                Object.prototype.hasOwnProperty.call(
                  jsonObj["m2m:rqp"].pc["m2m:sgn"].nev,
                  "rep"
                )
              ) {
                //cin noti
                if (
                  Object.keys(jsonObj["m2m:rqp"].pc["m2m:sgn"].nev.rep)[0] ===
                  "m2m:cin"
                ) {
                  let mission_payload = {};

                  mission_payload.drone_name = arr_topic[4];
                  mission_payload.payload = {};
                  mission_payload.payload.sur =
                    jsonObj["m2m:rqp"].pc["m2m:sgn"].sur;
                  mission_payload.payload.con =
                    jsonObj["m2m:rqp"].pc["m2m:sgn"].nev.rep["m2m:cin"].con;

                  let payload = JSON.parse(
                    JSON.stringify(mission_payload.payload)
                  );
                  mission_payload = null;
                  let arr_sur = payload.sur.split("/");
                  arr_sur.pop();
                  payload.sur = "/" + arr_sur.join("/");

                  //if ((this.missionLteUrl + '/' + this.sortie_name) === payload.sur) {
                  if (this.missionLteUrl === payload.sur) {
                    // console.log(payload.sur);

                    if (
                      Object.prototype.hasOwnProperty.call(payload.con, "rsrp")
                    ) {
                      this.colorLteVal = "#9E9E9E";

                      this.curLteVal = payload.con.rsrp;
                      //console.log(this.curLteVal);

                      payload = null;

                      if (0 > this.curLteVal && this.curLteVal >= -80) {
                        this.iconLte = "mdi-network-strength-4";
                        this.colorLteVal = "#1E88E5";
                      } else if (
                        -80 > this.curLteVal &&
                        this.curLteVal >= -90
                      ) {
                        this.iconLte = "mdi-network-strength-3";
                        this.colorLteVal = "#76FF03";
                      } else if (
                        -90 > this.curLteVal &&
                        this.curLteVal >= -100
                      ) {
                        this.iconLte = "mdi-network-strength-2";
                        this.colorLteVal = "#FFFF00";
                      } else {
                        this.iconLte = "mdi-network-strength-1";
                        this.colorLteVal = "#FF3D00";
                      }

                      this.info.colorLteVal = this.colorLteVal;
                      this.info.curLteVal = this.curLteVal;
                      this.info.iconLte = this.iconLte;

                      if (this.lteTimeoutObj) {
                        clearTimeout(this.lteTimeoutObj);
                      }

                      this.lteTimeoutObj = setTimeout(() => {
                        this.lteTimeoutObj = null;
                        this.colorLteVal = "#9E9E9E";
                        this.iconLte = "mdi-network-strength-off-outline";
                      }, 5500);
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    doSubscribe(topic) {
      if (this.client.connected) {
        const qos = 0;
        this.client.subscribe(topic, { qos }, (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
        });
      }
    },

    doUnSubscribe(topic) {
      if (this.client.connected) {
        this.client.unsubscribe(topic, (error) => {
          if (error) {
            console.log("Unsubscribe error", error);
          }

          console.log("Unsubscribe to topics (", topic, ")");
        });
      }
    },

    doPublish(topic, payload) {
      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        });
      }

      if (this.client.connected) {
        this.client.publish(topic, payload, 0, (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        });
      }
    },

    createConnection() {
      if (this.client.connected) {
        console.log(
          "DroneInfo",
          this.name,
          "createConnection",
          "destroyConnection"
        );
        this.destroyConnection();
      }

      if (!this.client.connected) {
        this.client.loading = true;
        this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
        this.connection.host = "127.0.0.1";
        const { host, port, endpoint, ...options } = this.connection;
        const connectUrl = `ws://${host}:${port}${endpoint}`;
        try {
          this.client = mqtt.connect(connectUrl, options);

          this.client.on("connect", () => {
            console.log(host, "Connection succeeded!");

            this.client.connected = true;
            this.client.loading = false;

            //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));

            let subtopic = "/oneM2M/req/Mobius2/" + "Sketi" + "/#";

            this.doUnSubscribe(subtopic);

            setTimeout(() => {
              this.doSubscribe(subtopic);
              console.log("Subscribe to ", subtopic);
            }, 200);
          });

          this.client.on("error", (error) => {
            console.log("Connection failed", error);

            this.destroyConnection();
          });

          this.client.on("close", () => {
            console.log("Connection closed");

            this.destroyConnection();

            this.connection.clientId = "mqttjs_" + this.name + "_" + nanoid(15);
          });

          this.client.on("message", (topic, message) => {
            // this.receiveNews = this.receiveNews.concat(message)
            console.log(`Received message ${message} from topic ${topic}`);
            console.log(
              `Received message:::::: ${message} from topic ::::::: ${topic}`
            );

            let obj = JSON.parse(message);

            this.console_text_message = JSON.stringify(obj, null, 2);

            //console.log(topic.split('/')[4], message.toString());

            let payload = {};
            payload.topic = topic;
            payload.message = message;

            this.onMessageHandler(payload.topic, payload.message);
          });
        } catch (error) {
          console.log("mqtt.connect error", error);
          this.client.connected = false;
        }
      }
    },

    destroyConnection() {
      if (this.client.connected) {
        try {
          if (Object.hasOwnProperty.call(this.client, "__ob__")) {
            this.client.end();
          }

          this.client = {
            connected: false,
            loading: false,
          };

          console.log(this.name, "Successfully disconnected!");

          //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));
        } catch (error) {
          this.client = {
            connected: false,
            loading: false,
          };
          //localStorage.setItem('mqttConnection-' + this.name, JSON.stringify(this.client));

          console.log("Disconnect failed", this.name, error.toString());
        }
      }
    },

    getData() {
      axios.get("http://localhost:3000/getdata").then((response) => {
        console.log(response.data);
        return (this.response_text = JSON.stringify(
          response.data,
          undefined,
          2
        ));
      });
    },

    recv_start() {
      this.$timer.start("getData");
      this.rev_connted = true;
    },
    recv_stop() {
      this.$timer.stop("getData");
      this.rev_connted = false;
    },
  },
  created() {
    this.createConnection();
  },

  beforeDestroy() {
    this.destroyConnection();
  },
};
</script>
