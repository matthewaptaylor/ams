<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Overview</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="6">
        <v-row dense>
          <v-col cols="12">
            <AutosaveText
              label="Activity name"
              type="text"
              :rules="[(v) => !!v || 'Activity name is required']"
              required
              :value="activityName"
              :error="nameError"
              @save="(v) => update(v, 'name', 'nameError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveSwitch
              labelLeft="Activity"
              labelTrue="requires"
              labelFalse="does not require"
              labelRight="an AIF"
              :value="requiresAIF"
              :error="requiresAIFError"
              @save="(v) => update(v, 'requiresAIF', 'requiresAIFError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveSwitch
              labelLeft="Activity"
              labelTrue="requires"
              labelFalse="does not require"
              labelRight="a RAMS form"
              :value="requiresRAMS"
              :error="requiresRAMSError"
              @save="(v) => update(v, 'requiresRAMS', 'requiresRAMSError')"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <AutosaveText
              label="Description"
              type="text"
              :value="description"
              :error="descriptionError"
              @save="(v) => update(v, 'description', 'descriptionError')"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <AutosaveText
              label="Location"
              type="text"
              :value="location"
              :error="locationError"
              @save="(v) => update(v, 'location', 'locationError')"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <AutosaveText
              label="Scout Group"
              type="combobox"
              :comboboxItems="[].concat(...Object.values(scoutGroups))"
              :value="scoutGroup"
              :error="scoutGroupError"
              @save="(v) => update(v, 'scoutGroup', 'scoutGroupError')"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <AutosaveText
              label="Scout Zone/Region"
              type="combobox"
              ref="scoutZoneRegionAutosave"
              :comboboxItems="Object.keys(scoutGroups)"
              :value="scoutZoneRegion"
              :error="scoutZoneRegionError"
              @save="
                (v) => update(v, 'scoutZoneRegion', 'scoutZoneRegionError')
              "
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start date"
              type="date"
              :value="startDate"
              :icon="calendarIcon"
              :error="startDateError"
              @save="(v) => update(v, 'startDate', 'startDateError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="Start time"
              type="time"
              :value="startTime"
              :icon="clockIcon"
              :error="startTimeError"
              @save="(v) => update(v, 'startTime', 'startTimeError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End date"
              type="date"
              :value="endDate"
              :icon="calendarIcon"
              :error="endDateError"
              @save="(v) => update(v, 'endDate', 'endDateError')"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AutosaveText
              label="End time"
              type="time"
              :value="endTime"
              :icon="clockIcon"
              :error="endTimeError"
              @save="(v) => update(v, 'endTime', 'endTimeError')"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar, mdiClock, mdiContentSave } from "@mdi/js";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";
import AutosaveSwitch from "../../../components/inputs/AutosaveSwitch.vue";

export default {
  components: { AutosaveText, AutosaveSwitch },

  props: {
    activityName: String,
    requiresAIF: Boolean,
    requiresRAMS: Boolean,
    description: String,
    location: String,
    scoutGroup: String,
    scoutZoneRegion: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
  },

  methods: {
    update(v, fieldName, errorName) {
      // Display activities
      this[errorName] = null;

      this.$functions
        .httpsCallable("activityOverviewSet")({
          id: this.$route.params.activityId,
          [fieldName]: v,
        })
        .then(() => {
          // Success
          this.$emit("update", fieldName, v);
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },
  },

  watch: {
    scoutGroup(v) {
      Object.keys(this.scoutGroups).forEach((zone) => {
        if (this.scoutGroups[zone].includes(v)) {
          // Automatically change zone based on group
          this.$refs.scoutZoneRegionAutosave.currentValue = zone;
          this.$refs.scoutZoneRegionAutosave.save();
        }
      });
    },
  },

  data() {
    return {
      // Icons
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,
      contentSaveIcon: mdiContentSave,

      // Fields
      nameError: null,
      requiresAIFError: null,
      requiresRAMSError: null,
      descriptionError: null,
      locationError: null,
      scoutGroupError: null,
      scoutZoneRegionError: null,
      startDateError: null,
      startTimeError: null,
      endDateError: null,
      endTimeError: null,

      // Scout groups, zones, and regions
      scoutGroups: {
        "Northland Zone - Upper North Island": [
          "1st Dargaville Scout Group",
          "Bream Bay Scout Group",
          "Doubtless Bay Sea Scout Group",
          "Hora Hora Scout Group",
          "Kamo Scout Group",
          "Kerikeri Scout Group",
          "Mid Northern Scout Group",
          "Paihia Sea Scout Group",
          "Shackleton Sea Scouts",
        ],
        "Waitoru Zone - Upper North Island": [
          "Edmonton Scout Group",
          "Kaukapakapa Scout Group",
          "Kereru Massey Scout Group",
          "Motutara/Waimauku Scout Group",
          "Riverhead Scout Group",
          "Te Atatu Endeavour Sea Scouts",
          "West West Rover Crew",
          "Whenuapai Air Scouts",
        ],
        "Mahurangi Zone - Upper North Island": [
          "Awatuna Sea Scouts",
          "Coatesville Scout Group",
          "Orewa Sea Scouts",
          "Puhoi Air Scout Group",
          "Taiaotea Air Scouts",
          "Tauhinu Sea Scout Group",
          "Warkworth Scout Group",
          "Whangaparaoa Scout Group",
        ],
        "Rangitoto Zone - Upper North Island": [
          "1st Devonport Scout Group",
          "All Saints Birkenhead Scout Group",
          "Bays Rover Crew",
          "Beach Haven Scout Group",
          "Birkenhead Sea Scout Group",
          "Calliope Sea Scouts",
          "Mairangi Bay Scout Group",
          "Mayfield Scout Group – Auckland",
          "Milford Sea Scout Group",
          "Rangitoto Combined Venturer Unit",
          "Sunnynook Scout Group",
          "Takapuna Scout Group",
        ],
        "Moanarua Zone - Upper North Island": [
          "1st Mt Albert St Judes Scout Group",
          "Glen Eden Scout Group",
          "Hawke Sea Scouts",
          "Iona Scout Group",
          "Maungawhau Balmoral Scout Group",
          "Motu Moana/Green Bay Scout Group",
          "New Lynn Sea Scout Group",
          "Oratia Air Scout Group",
          "Owairaka Sea Scouts",
          "Pt Chevalier Air Scout Group",
          "Roskill Rover Crew",
          "Western Bays Sea Scouts",
        ],
        "Akarana Zone - Upper North Island": [
          "1st Orakei Sea Scouts",
          "Aotea Sea Scouts",
          "Dilworth Scout Group",
          "One Tree Hill/Ellerslie Scout Group",
          "Remuera West Scout Group",
          "Right Royal Rover Crew",
          "Royal Oak Scout Group",
          "St Chads Scout Group",
          "St George/Epsom Scout Group",
          "St Heliers/Glendowie Scout Group",
          "Stonefields Scout Group",
          "Waikowhai Scout Group",
          "Wainui Sea Scout Group",
        ],
        "Manukau Zone - Upper North Island": [
          "1st Waiheke Sea Scout Group",
          "Bucklands Beach Sea Scout Group",
          "Captain Musick Air Scouts",
          "Cockle Bay Scout Group",
          "Farm Cove Pakuranga Scout Group",
          "Howick Sea Scouts",
          "Mangere Bridge Scout Group",
          "Ormiston Scout Group",
          "Papatoetoe Scout Group",
          "Te Puru Sea Scout Group",
          "Trinity Pakuranga Scout Group",
        ],
        "Counties Zone - Upper North Island": [
          "Bombay Scout Group",
          "Clevedon Scout Group",
          "Drury Scout Group",
          "Manurewa Scout Group",
          "Papakura Sea Scout Group",
          "Pukekohe Scout Group",
          "Te Kauwhata Scout Group",
          "Tuakau Districts Sea Scouts",
          "Waiau Pa Scout Group",
          "Waikaretu Sea Scouts",
          "Waiuku Scout Group",
          "Weymouth Sea Scouts",
        ],
        "Eastern Waikato Zone - Upper North Island": [
          "1st Waihi Scout Group",
          "Matamata Scout Group",
          "Morrinsville Scout Group",
          "Paeroa Scout Group",
          "Turua Scout Group",
          "Whangamata Scout Group",
          "Whitianga Sea Scouts",
        ],
        "Waikato Zone - Upper North Island": [
          "1st Matapuna Scout Group",
          "Cambridge Scout Group",
          "Chartwell Scout Group",
          "Hillcrest Scout Group",
          "Kirikiriroa Scout Group",
          "Ohaupo Scout Group",
          "Pirongia Scout Group",
          "Putaruru Scout Group",
          "St Marys Scout Group – Hamilton",
          "St Peter’s Sea Scouts",
          "Te Awamutu Scout Group",
          "Te Kuiti Scout Group",
          "Waikato Rover Crew",
        ],
        "Western Bay of Plenty Zone - Lower North Island": [
          "Arataki Omanu Scout Group",
          "City Church Scout Group",
          "Greerton Scout Group",
          "Katikati Sea Scout Group",
          "Matua Scout Group",
          "Omokoroa/Pahoia Sea Scouts",
          "Papamoa Scout Group",
          "Te Puke Scout Group",
          "Western Bay of Plenty Rover Crew",
        ],
        "Volcanic Zone - Lower North Island": [
          "1st Ngongotaha Scout Group",
          "1st Taupo Scout Group",
          "Awakeri Scout Group",
          "Kawerau Scout Group",
          "Kingsley Scout Group",
          "Lynmore Scout Group",
          "Rotorua Central Scout Group",
          "Waiotapu Scout Group",
        ],
        "Waiapu Zone - Lower North Island": [
          "1st Windsor Scout Group",
          "Greendale/Tamatea Scout Group",
          "Havelock North Scout Group",
          "Kaweka Rover Crew",
          "Mangapapa Scout Group",
          "Rata Olsen Scout Group",
          "St Augustines Scout Group – Napier",
          "Tainui Sea Scout Group",
          "Takapau Scout Group",
          "Waipukurau Scout Group",
          "Westshore Sea Scout Group",
        ],
        "Taranaki Zone - Lower North Island": [
          "1st Mikotahi Sea Scout Group",
          "Alton Scout Group",
          "Fitzroy Scout Group",
          "Inglewood Scout Group",
          "Midhirst Scout Group",
          "Pukekura Scout Group",
          "South Taranaki Scout Group",
          "Stratford Scout Group",
          "Waitara Scout Group",
          "Westown Scout Group",
        ],
        "Manawatu Horizons Zone - Lower North Island": [
          "Ashhurst Scout Group",
          "Baden Powell Scout Group",
          "Bulls Air Scout Group",
          "Eastman Rover Crew",
          "Feilding Scout Group",
          "Hokowhitu Scout Group",
          "Milson Scout Group",
          "Pahiatua Scout Group",
          "Roslyn Scout Group – Palmerston North",
          "St John’s Scout Group",
          "Stewart Rover Crew",
          "Te Awe Awe Scout Group",
          "Tokomaru Scout Group",
          "West End Scout Group",
        ],
        "Kapiti Coastal Zone - Lower North Island": [
          "1st Titahi Bay Scout Group",
          "Kotuku Sea Scout Group",
          "Ngati Toa Sea Scout Group",
          "Otaki Scout Group",
          "Paekakariki Scout Group",
          "Paraparaumu Beach Sea Scouts",
          "Paraparaumu Scout Group",
          "Pukerua Bay Scout Group",
          "Raumati Scout Group",
          "St Mary’s Scout Group – Levin",
          "Tararua Rover Crew",
          "Waikanae Scout Group",
          "Waitarere Scout Group",
          "Whitby Scout Group",
        ],
        "Remutaka Zone - Lower North Island": [
          "1st Carterton Scout Group",
          "Akatarawa Scout Group",
          "Greytown Scout Group",
          "Heretaunga Scout Group",
          "Silverpine Scout Group",
          "St Joseph’s Scout Group – Upper Hutt",
          "Whakaoriori Air Scout Group",
        ],
        "Lower Hutt Zone - Lower North Island": [
          "1st Wainuiomata Parish Scout Group",
          "1st Waterloo Scout Group",
          "2nd Lower Hutt Scout Group",
          "Belmont Scout Group",
          "Eastbourne Scout Group",
          "Korokoro Scout Group",
          "Maungaraki/Richmond Scout Group",
          "Orongorongo Rover Scout Crew",
          "St Augustines Scout Group – Petone",
          "St James Sea Scout Group",
          "Stokes Valley Scout Group",
          "Valley Rover Crew",
        ],
        "Wellington Zone - Lower North Island": [
          "1st Island Bay Scout Group",
          "1st Karori Scout Group",
          "1st Kelburn 1909 Scout Group",
          "Bounty Sea Rovers",
          "Britannia Sea Scouts",
          "Brooklyn Scout Group",
          "Eastern Bays Scout Group",
          "Johnsonville Scout Group",
          "Karori West Scout Group",
          "Khandallah Scout Group",
          "Newlands Scout Group",
          "Ngaio Scout Group",
          "Northland Scout Group",
          "Paparangi Scout Group",
          "Regal Rover Crew",
          "Suzanne Aubert Scout Group",
          "Tawa Scout Group",
          "Victoria Rover Crew",
          "Wadestown Scout Group",
        ],
        "Nelson Zone - South Island": [
          "Brightwater Scout Group",
          "Enner Glynn Scout Group",
          "Golden Bay Scout Group",
          "Iron Duke Sea Scouts",
          "Murchison Scout Group",
          "Richmond Scout Group",
          "Stoke Scout Group",
          "Tamaha Sea Scout Group",
          "Wakefield Scout Group",
        ],
        "Marlborough Zone - South Island": [
          "Church of Nativity Scout Group",
          "Churchward Park Scout Group",
          "Marlborough Venturers",
          "Robin Hood Rover Crew",
          "Springlands Sea Scout Group",
          "Woodbourne Air Scout Group",
        ],
        "Westland-Buller Zone - South Island": [
          "Franz Josef Glacier Scout Group",
          "Grey Valley Scout Group",
          "Greymouth Scout Group",
        ],
        "North Canterbury Zone - South Island": [
          "Glenmark Scout Group",
          "Kaiapoi Gray Raven Scout Group",
          "Rangiora Scout Group",
          "Waimakariri Scout Group",
        ],
        "East Christchurch Zone - South Island": [
          "Burwood Scout Group",
          "Malvern Scout Group",
          "Marshland Scout Group",
          "New Brighton Scout Group",
          "North Beach Scout Group",
          "St Matthews LLO Scout Group",
        ],
        "Torlesse Zone - South Island": [
          "Avonhead/Russley Scout Group",
          "Bishopdale/Harewood Scout Group",
          "Gordon Scout Group",
          "Holmes Park Scout Group",
          "Redwood Scout Group",
        ],
        "Pukepuke Zone - South Island": [
          "Cashmere Scout Group",
          "Diamond Harbour Sea Scouts",
          "Halswell Scout Group",
          "Lyttelton Sea Scout Group",
          "Mt Pleasant Sea Scouts",
          "St Martins Scout Group",
          "St Nicholas Scout Group",
        ],
        "Selwyn Zone - South Island": [
          "Darfield Scout Group",
          "Ellesmere Scout Group",
          "Lincoln Scout Group",
          "Rolleston Scout Group",
          "West Melton Scout Group",
        ],
        "Mania-O-Roto Zone - South Island": [
          "Allenton Scout Group",
          "Ashburton Scout Group",
          "Hinds Scout Group",
          "Mania-O-Roto Rover Crew",
          "Mayfield Scout Group – Canterbury",
          "Methven Scout Group",
          "Rakaia Scout Group",
          "Tinwald Scout Group",
        ],
        "South Canterbury Zone - South Island": [
          "Endeavour Sea Scout Group",
          "Geraldine Scout Group",
          "Gleniti Scout Group",
          "Highfield Mountainview Scout Group",
          "Northdown Te Rangi Scout Group",
          "Pleasant Point Scout Group",
          "Rowallan Scout Group",
          "Waimate Scout Group",
        ],
        "Lower South Islan - South Island": [
          "CENTRAL LAKES ZONE:",
          "1st Alexandra Scout Group",
          "Arrowtown Scout Group",
          "Cromwell Scout Group",
          "Dunstan Rover Crew",
          "Queenstown Scout Group",
          "Wanaka Scout Group",
        ],
        "North Otago Zone - South Island": [
          "Columba Scout Group",
          "Puketapu Scout Group",
          "Scotts Own Sea Scouts",
        ],
        "Coastal Otago Zone - South Island": [
          "Andersons Bay Sea Scouts",
          "Balclutha Scout Group",
          "Brighton Sea Scouts",
          "Kew Corstorphine Scout Group",
          "Macandrew Bay Scout Group",
          "Mornington Scout Group",
          "Mosgiel Scout Group",
          "Opoho Scout Group",
          "Otago Rover Crew",
          "Roslyn Scout Group – Dunedin",
          "Saddle View Scout Group",
          "St Kilda Scout Group",
          "Terra Nova Sea Scouts",
          "Wakari Scout Group",
        ],
        "Western-Southland Zone - South Island": [
          "Balfour Scout Group",
          "St Andrews Scout Group",
          "Takitimu Scout group",
          "Te Anau Sea Scouts",
          "Tuatapere Valley Scout Group",
          "Waianiwa Scout Group",
          "Winton Scout Group",
        ],
        "Murihiku Zone - South Island": [
          "1st Gore Scout Group",
          "Aurora Rover Crew",
          "Edendale Scout Group",
          "Georgetown Scout Group",
          "Gladstone Scout Group",
          "Jellicoe Sea Scouts",
          "Mataura Scout Group",
          "Te Ara O Kiwa Sea Scouts",
          "Toi Tois Scout Group",
          "Waikaka Scout Group",
          "Waverley Scout Group",
          "Woodlands Scout Group",
        ],
      },
    };
  },
};
</script>
