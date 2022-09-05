<template>
  <b-container>
    <h2 class="text-center">oneM2M Resource Update</h2>
    <br /><br />
    <b-col>
      <label for="input-live">Platform Address:</label>
      <b-form-input
        id="Platform"
        v-model="data_obj.Platform_addr"
        :state="data_obj.Platform_addr.length >= 9"
        placeholder="Enter Platform Address"
        trim
      ></b-form-input>
    </b-col>

    <b-row>
      <b-col>
        <v-btn
          class="ma-1"
          color="deep-purple"
          block
          outlined
          raised
          rounded
          elevation="2"
          v-on:click="ae_form"
        >
          AE
        </v-btn>
      </b-col>
      <b-col>
        <v-btn
          class="ma-1"
          color="deep-purple"
          block
          outlined
          raised
          rounded
          elevation="2"
          v-on:click="cnt_form"
        >
          Container
        </v-btn>
      </b-col>
      <b-col>
        <v-btn
          class="ma-1"
          color="deep-purple"
          block
          outlined
          raised
          rounded
          elevation="2"
          v-on:click="sub_form"
        >
          Subscription</v-btn
        >
      </b-col>
    </b-row>
    <br />

    <!-- ae form-->
    <v-card
      v-if="selected === 'ae'"
      class="pa-10"
      outlined
      shaped
      elevation="3"
    >
      <h3>oneM2M Request Primitive Parameters - ae</h3>
      <v-row>
        <v-col>
          <v-card class="pa-1" shaped elevation="0">
            <h3>&nbsp;</h3>
            <b-col>
              <label for="input-live">To (to): String</label>
              <b-form-input
                id="resid"
                v-model="data_obj.Res_Id"
                :state="data_obj.Res_Id.length >= 3"
                placeholder="Enter Resource ID (TO)"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">From (fr): String</label>
              <b-form-input
                id="xm2morigin"
                v-model="data_obj.X_M2M_Origin"
                :state="data_obj.X_M2M_Origin.length >= 1"
                placeholder="Enter X-M2M Origin"
                trim
              ></b-form-input>

              <br />
              <!-- // X-M2M-RI: -->
              <label for="input-live">Request ID (rqi): String </label>
              <b-form-input
                id="xm2ri"
                v-model="data_obj.X_M2M_RI"
                :state="data_obj.X_M2M_RI.length >= 0"
                placeholder="Enter request ID"
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>

        <v-col>
          <h5>Primitive Content (pc):</h5>
          <v-card class="pa-3" outlined shaped elevation="1">
            <b-col>
              <label for="input-live">labels (lbl): Array of String</label>
              <b-form-input
                id="xm2mlbl"
                v-model="data_obj.lbl"
                :state="data_obj.lbl.length >= 0"
                placeholder="[''key1'', ''key2'']"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">requestReachability (rr): Boolean</label>
              <b-form-input
                id="xm2mrr"
                v-model="data_obj.rr"
                :state="data_obj.rr.length >= 0"
                placeholder="true"
                trim
              ></b-form-input>
              <br />

              <br /><br />
            </b-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!--cnt form-->
    <v-card
      v-if="selected === 'cnt'"
      class="pa-10"
      outlined
      shaped
      elevation="3"
    >
      <h3>oneM2M Request Primitive Parameters - container</h3>
      <v-row>
        <v-col>
          <v-card class="pa-1" shaped elevation="0">
            <h3>&nbsp;</h3>
            <b-col>
              <label for="input-live">To (to): String</label>
              <b-form-input
                id="resid"
                v-model="data_obj.Res_Id"
                :state="data_obj.Res_Id.length >= 3"
                placeholder="Enter Resource ID (TO)"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">From (fr): String</label>
              <b-form-input
                id="xm2morigin"
                v-model="data_obj.X_M2M_Origin"
                :state="data_obj.X_M2M_Origin.length >= 1"
                placeholder="Enter X-M2M Origin"
                trim
              ></b-form-input>

              <br />
              <!-- // X-M2M-RI: -->
              <label for="input-live">Request ID (rqi): String </label>
              <b-form-input
                id="xm2ri"
                v-model="data_obj.X_M2M_RI"
                :state="data_obj.X_M2M_RI.length >= 0"
                placeholder="Enter request ID"
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>

        <v-col>
          <h5>Primitive Content (pc):</h5>
          <v-card class="pa-3" outlined shaped elevation="1">
            <b-col>
              <label for="input-live">labels (lbl): Array of String</label>
              <b-form-input
                id="xm2mlbl"
                v-model="data_obj.lbl"
                :state="data_obj.lbl.length >= 0"
                placeholder="[''key1'', ''key2'']"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">maxByteSize (mbs): Integer</label>
              <b-form-input
                id="xm2mmbs"
                v-model="data_obj.mbs"
                :state="data_obj.mbs.length >= 0"
                placeholder="16384"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">maxNrOfInstances (mni): Integer</label>
              <b-form-input
                id="xm2mmni"
                v-model="data_obj.mni"
                :state="data_obj.mni.length >= 0"
                placeholder="31536000"
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!--sub form-->
    <v-card
      v-if="selected === 'sub'"
      class="pa-10"
      outlined
      shaped
      elevation="3"
    >
      <h3>oneM2M Request Primitive Parameters - subscription</h3>
      <v-row>
        <v-col>
          <v-card class="pa-1" shaped elevation="0">
            <h3>&nbsp;</h3>
            <b-col>
              <label for="input-live">To (to): String</label>
              <b-form-input
                id="resid"
                v-model="data_obj.Res_Id"
                :state="data_obj.Res_Id.length >= 3"
                placeholder="Enter Resource ID (TO)"
                trim
              ></b-form-input>
              <br />
              <label for="input-live">From (fr): String</label>
              <b-form-input
                id="xm2morigin"
                v-model="data_obj.X_M2M_Origin"
                :state="data_obj.X_M2M_Origin.length >= 1"
                placeholder="Enter X-M2M Origin"
                trim
              ></b-form-input>
              <br />
              <!-- // X-M2M-RI: -->
              <label for="input-live">Request ID (rqi): String </label>
              <b-form-input
                id="xm2ri"
                v-model="data_obj.X_M2M_RI"
                :state="data_obj.X_M2M_RI.length >= 0"
                placeholder="Enter request ID"
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>

        <v-col>
          <h5>Primitive Content (pc):</h5>
          <v-card class="pa-3" outlined shaped elevation="1">
            <b-col>
              <label for="input-live">labels (lbl): Array of String</label>
              <b-form-input
                id="xm2mlbl"
                v-model="data_obj.lbl"
                :state="data_obj.lbl.length >= 0"
                placeholder="[''key1'', ''key2'']"
                trim
              ></b-form-input>
              <br />

              <label for="input-live">notificationURI (nu): String</label>
              <b-form-input
                id="sub_nu"
                v-model="data_obj.nu"
                :state="data_obj.nu.length >= 0"
                placeholder="[''mqtt://127.0.0.1:8883'']"
                trim
              ></b-form-input>
              <br />

              <label for="input-live"
                >EventNotificationCriteria (enc): Array of Integer</label
              >
              <b-form-input
                id="sub_enc"
                v-model="data_obj.enc"
                :state="data_obj.enc.length >= 0"
                placeholder="[1, 2]"
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <br />

    <!-- AE 선택시 HTTP 버튼-->
    <b-row v-if="selected === 'ae'">
      <b-col>
        <v-btn
          class="ma-0 deep-purple--text"
          color="#FBF9FF"
          outlined
          block
          raised
          elevation="2"
          rounded
          @click="putae_print"
        >
          CREATE HTTP REQUEST
        </v-btn>
      </b-col>

      <b-col>
        <v-btn
          class="ma-0 indigo--text"
          color="#EDE7F6"
          block
          raised
          elevation="2"
          rounded
          @click="put_request"
        >
          UPDATE
        </v-btn>
      </b-col>
    </b-row>

    <!-- CNT 선택시 HTTP 버튼-->
    <b-row v-if="selected === 'cnt'">
      <b-col>
        <v-btn
          class="ma-0 deep-purple--text"
          color="#FBF9FF"
          outlined
          block
          raised
          elevation="2"
          rounded
          @click="putcnt_print"
        >
          CREATE HTTP REQUEST
        </v-btn>
      </b-col>
      <b-col>
        <v-btn
          class="ma-0 indigo--text"
          color="#EDE7F6"
          block
          raised
          elevation="2"
          rounded
          @click="put_request"
        >
          UPDATE
        </v-btn>
      </b-col>
    </b-row>

    <!-- SUB 선택시 HTTP 버튼-->
    <b-row v-if="selected === 'sub'">
      <b-col>
        <v-btn
          class="ma-0 deep-purple--text"
          color="#FBF9FF"
          outlined
          block
          raised
          elevation="2"
          rounded
          @click="putsub_print"
        >
          CREATE HTTP REQUEST
        </v-btn>
      </b-col>
      <b-col>
        <v-btn
          class="ma-0 indigo--text"
          color="#EDE7F6"
          block
          raised
          elevation="2"
          rounded
          @click="put_request"
        >
          UPDATE
        </v-btn>
      </b-col>
    </b-row>
    <br />

    <v-card class="pa-10" outlined shaped elevation="2">
      <v-row>
        <!-- <b-col sm="6" md="5" offset-md="2" lg="6" offset-lg="0">-->
        <b-col>
          <h5>HTTP Request</h5>
          <b-card shadow="always">
            <div>
              <br />
              {{ data_obj.Update_text }}
              {{ "http://" + data_obj.Platform_addr + "/" + data_obj.Res_Id }}
              <br />
              <br />

              <b>Header </b><br />
              <b-table
                ref="reqtable"
                style="font-size: 0.9rem"
                small
                stacked
                :items="req_items"
                :fields="req_fields"
              >
              </b-table>
              <h5>&nbsp;</h5>
              <b>Body</b>

              <b-form-textarea
                style="font-size: 0.8rem"
                id="textreq"
                v-model="request_text"
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </div>
          </b-card>
          <br />
        </b-col>
        <br />

        <b-col sm="6" md="5" offset-md="2" lg="6" offset-lg="0">
          <h5>HTTP Response</h5>
          <b-card shadow="always">
            <div>
              <br />{{ this.res_status }} <br /><br />
              <b>Header</b>
              <b-table
                ref="restable"
                style="font-size: 0.9rem"
                small
                stacked
                :items="res_items"
                :fields="res_fields"
              >
              </b-table>

              <b>Body</b>
              <b-form-textarea
                style="font-size: 0.8rem"
                id="textres"
                v-model="response_text"
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </div>
          </b-card>
        </b-col>

        <br />
      </v-row>
    </v-card>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selected: "ae",
      res_name: "",
      data_obj: {
        Update_text: "PUT",
        Platform_addr: "127.0.0.1:7579",
        Res_Id: "Mobius",
        X_M2M_RI: "12345",
        X_M2M_Origin: "SOrigin",
        Accept: "application/json",
        lbl: "",
        mni: "",
        mbs: "",
        mia: "31536000",
        op: "3",
        rn: "",
        rr: "",
        //enc: '',
        enc: "",
        nu: "",
      },
      url_fields: [
        { key: "Platform_addr", class: "text-center" },
        { key: "Res_Id", class: "text-center" },
      ],
      url_items: [{ Platform_addr: "", Res_Id: "" }],
      req_fields: [
        { key: "X-M2M-RI", class: "text-center" },
        { key: "X-M2M-Origin", class: "text-center" },
        { key: "Content-Type", class: "text-center" },
        { key: "Accept", class: "text-center" },
      ],
      req_items: [
        { "X-M2M-RI": "", "X-M2M-Origin": "", "Content-Type": "", Accept: "" },
      ],
      res_fields: [
        { key: "X-M2M-RI", class: "text-center" },
        { key: "X-M2M-RSC", class: "text-center" },
        { key: "X-M2M-RVI", class: "text-center" },
        { key: "Content-Length", class: "text-center" },
        { key: "Content-Type", class: "text-center" },
      ],
      res_items: [
        {
          "X-M2M-RI": "",
          "X-M2M-RSC": "",
          "X-M2M-RVI": "",
          "Content-Length": "",
          "Content-Type": "",
        },
      ],
      headers_text: "",
      request_text: "",
      response_text: "",
      res_mess: "",
      res_errmess: "",
      res_status: "",
    };
  },
  methods: {
    ae_form() {
      this.selected = "ae";
    },
    cnt_form() {
      this.selected = "cnt";
    },
    sub_form() {
      this.selected = "sub";
    },

    request_url_change(obj) {
      console.log(obj);
      this.url_items[0]["Platform_addr"] = obj["Platform_addr"];
      this.url_items[0]["Res_Id"] = obj["Res_Id"];
      this.$refs.urltable.refresh();
    },
    request_header_change(obj) {
      console.log(obj);
      this.req_items[0]["X-M2M-RI"] = obj["X-M2M-RI"];
      this.req_items[0]["X-M2M-Origin"] = obj["X-M2M-Origin"];
      this.req_items[0]["Content-Type"] = obj["Content-Type"];
      this.req_items[0]["Accept"] = obj["Accept"];
      this.$refs.reqtable.refresh();
    },
    response_header_change(obj) {
      console.log(obj);
      this.res_items[0]["X-M2M-RI"] = obj["X-M2M-RI"];
      this.res_items[0]["X-M2M-RSC"] = obj["X-M2M-RSC"];
      this.res_items[0]["X-M2M-RVI"] = obj["X-M2M-RVI"];
      this.res_items[0]["Content-Length"] = obj["Content-Length"];
      this.res_items[0]["Content-Type"] = obj["Content-Type"];
      this.$refs.restable.refresh();
    },

    putae_print() {
      let ae_obj = {};
      ae_obj["m2m:ae"] = {};
      if (this.data_obj.lbl != "") {
        ae_obj["m2m:ae"].lbl = JSON.parse(this.data_obj.lbl);
      }
      ae_obj["m2m:ae"].rr = this.data_obj.rr === "true";
      this.data_obj["Content-Type"] = "applicaton/json";
      this.data_obj["body"] = ae_obj;

      let headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Accept"] = this.data_obj.Accept;
      headers["Content-Type"] = this.data_obj["Content-Type"];

      this.req_display_obj = ae_obj;
      this.request_header_change(headers);
      return (this.request_text = JSON.stringify(
        this.req_display_obj,
        undefined,
        2
      ));
    },

    putcnt_print() {
      let cnt_obj = {};
      cnt_obj["m2m:cnt"] = {};
      if (this.data_obj.lbl != "") {
        cnt_obj["m2m:cnt"].lbl = JSON.parse(this.data_obj.lbl);
      }
      if (this.data_obj.mbs != "") {
        cnt_obj["m2m:cnt"].mbs = parseInt(this.data_obj.mbs);
      }
      if (this.data_obj.mni != "") {
        cnt_obj["m2m:cnt"].mni = parseInt(this.data_obj.mni);
      }

      this.data_obj["Content-Type"] = "applicaton/json";
      this.data_obj["body"] = cnt_obj;

      let headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Accept"] = this.data_obj.Accept;
      headers["Content-Type"] = this.data_obj["Content-Type"];

      this.req_display_obj = cnt_obj;
      this.request_header_change(headers);
      return (this.request_text = JSON.stringify(
        this.req_display_obj,
        undefined,
        2
      ));
    },

    putsub_print() {
      let sub_obj = {};
      sub_obj["m2m:sub"] = {};

      if (this.data_obj.enc != "") {
        sub_obj["m2m:sub"].enc = {};
        sub_obj["m2m:sub"].enc.net = JSON.parse(this.data_obj.enc);
      }
      sub_obj["m2m:sub"].exc = 0;

      if (this.data_obj.lbl != "") {
        sub_obj["m2m:sub"].lbl = JSON.parse(this.data_obj.lbl);
      }
      //sub_obj["m2m:sub"].nu = ["http://127.0.0.1:8369"];
      sub_obj["m2m:sub"].nu = JSON.parse(this.data_obj.nu);

      //sub_obj["m2m:sub"].nu = JSON.parse(this.data_obj.nu);
      //this.data_obj["Content-Type"] = "applicaton/json;ty=23";
      this.data_obj["Content-Type"] = "applicaton/json";

      this.data_obj["body"] = sub_obj;

      let headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Accept"] = this.data_obj.Accept;
      headers["Content-Type"] = this.data_obj["Content-Type"];

      this.req_display_obj = sub_obj;
      this.request_header_change(headers);

      return (this.request_text = JSON.stringify(
        this.req_display_obj,
        undefined,
        2
      ));
    },

    put_request() {
      let url =
        "http://" + this.data_obj.Platform_addr + "/" + this.data_obj.Res_Id;
      const headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Content-Type"] = this.data_obj["Content-Type"];
      headers["Accept"] = this.data_obj.Accept;

      let body = this.data_obj.body;
      axios
        .put(url, body, { headers })
        .then((response) => {
          this.res_mess = response.data;
          this.res_status = response.status;
          let headers = {};
          headers["X-M2M-RI"] = response.headers["x-m2m-ri"];
          headers["X-M2M-RSC"] = response.headers["x-m2m-rsc"];
          headers["X-M2M-RVI"] = response.headers["x-m2m-rvi"];
          headers["Content-Length"] = response.headers["content-length"];
          headers["Content-Type"] = response.headers["content-type"];
          this.response_header_change(headers);

          return (this.response_text = JSON.stringify(
            this.res_mess,
            undefined,
            2
          ));
        })
        .catch((error) => {
          this.res_errmess = error.response.data;
          if (error.response.status === 409) {
            this.res_status = error.response.status;
          } else if (error.response.status === 404) {
            this.res_status = error.response.status;
          }
          let headers = {};
          headers["X-M2M-RI"] = error.response.headers["x-m2m-ri"];
          headers["X-M2M-RSC"] = error.response.headers["x-m2m-rsc"];
          headers["X-M2M-RVI"] = error.response.headers["x-m2m-rvi"];
          headers["Content-Length"] = error.response.headers["content-length"];
          headers["Content-Type"] = error.response.headers["content-type"];
          this.response_header_change(headers);

          return (this.response_text = this.res_errmess);
        });
    },
  },
};
</script>
