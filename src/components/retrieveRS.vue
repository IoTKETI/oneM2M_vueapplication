<template>
  <b-container>
    <h2 class="text-center">oneM2M Resource Retrieval</h2>
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
    <br />

    <v-card class="pa-10" outlined shaped elevation="3">
      <h3>oneM2M Request Primitive Parameters</h3>
      <v-row>
        <v-col>
          <v-card class="pa-1" shaped elevation="0">
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
                id="xm2mri"
                v-model="data_obj.X_M2M_RI"
                :state="data_obj.X_M2M_RI.length >= 4"
                placeholder="Enter X-M2M RI"
                trim
              ></b-form-input>
              <br />

              <label for="input-live">Query Parameters:</label>
              <b-form-input
                id="query_Params"
                v-model="query_Params"
                :state="query_Params.length >= 0"
                placeholder="ex)?fu=1&ty=3....."
                trim
              ></b-form-input>
              <br />
            </b-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <br />
    <v-row>
      <v-col>
        <v-btn
          class="ma-0"
          color="indigo"
          block
          outlined
          raised
          rounded
          elevation="2"
          @click="ret_print"
        >
          CREATE HTTP REQUEST
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          class="ma-0 indigo--text"
          color="#EDE7F6"
          block
          raised
          rounded
          elevation="2"
          @click="get_requst"
        >
          SEND
        </v-btn>
      </v-col>
    </v-row>
    <br /><br />

    <v-card class="pa-10" outlined shaped elevation="3">
      <v-row>
        <b-col align-self="stretch">
          <h5>HTTP Request</h5>
          <b-card shadow="always">
            <br />
            {{ data_obj.Retrieve_text }}
            {{ "http://" + data_obj.Platform_addr + "/" + data_obj.Res_Id }}
            <br />
            <br />
            <div>
              <b>Header</b>
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
              <h5>&nbsp;</h5>
              <b>Body</b>

              <b-form-textarea
                style="font-size: 0.8rem"
                id="textreq"
                v-model="request_text"
                rows="15"
                max-rows="15"
              ></b-form-textarea>
            </div>
          </b-card>
        </b-col>

        <b-col align-self="stretch">
          <h5>HTTP Response</h5>
          <b-card shadow="always">
            <br />
            {{ this.res_status }}
            <br />
            <br />
            <div>
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
              <b>Body</b> {{ this.res_status }}
              <b-form-textarea
                style="font-size: 0.8rem"
                id="textres"
                v-model="response_text"
                rows="15"
                max-rows="15"
              ></b-form-textarea>
            </div>
          </b-card>
        </b-col>
      </v-row>
    </v-card>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data_obj: {
        Platform_addr: "127.0.0.1:7579",
        Res_Id: "Mobius",
        X_M2M_RI: "12345",
        X_M2M_Origin: "SOrigin",
        Accept: "application/json",
        Retrieve_text: "GET",
      },
      req_fields: [
        { key: "X-M2M-RI", class: "text-center" },
        { key: "X-M2M-Origin", class: "text-center" },
        { key: "Accept", class: "text-center" },
      ],
      req_items: [{ "X-M2M-RI": "", "X-M2M-Origin": "", Accept: "" }],
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
      query_Params: "",
      request_text: "",
      response_text: "",
      res_name: "",
      res_mess: "",
      res_errmess: "",
      res_status: "",
    };
  },
  methods: {
    request_header_change(obj) {
      console.log(obj);
      this.req_items[0]["X-M2M-RI"] = obj["X-M2M-RI"];
      this.req_items[0]["X-M2M-Origin"] = obj["X-M2M-Origin"];
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

    ret_print() {
      let ret_obj = {};
      this.data_obj["Content-Type"] = "applicaton/json;ty=2";

      let headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Accept"] = this.data_obj.Accept;
      headers["Content-Type"] = this.data_obj["Content-Type"];

      this.req_display_obj = ret_obj;
      this.request_header_change(headers);
      return (this.request_text = JSON.stringify(ret_obj, undefined, 2));
    },

    get_requst() {
      let url =
        "http://" +
        this.data_obj.Platform_addr +
        "/" +
        this.data_obj.Res_Id +
        this.query_Params;
      const headers = {};
      headers["X-M2M-RI"] = this.data_obj.X_M2M_RI;
      headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin;
      headers["Accept"] = this.data_obj.Accept;

      this.request_header_change(headers);
      axios
        .get(url, { headers })
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
