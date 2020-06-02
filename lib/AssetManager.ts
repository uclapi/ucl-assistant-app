import { Feather } from "@expo/vector-icons"

const uclapi = {
  iconForeground: require(`../assets/images/icon-fg.png`),
  smallIcon: require(`../assets/images/uclapi.png`),
  splash: require(`../assets/images/splash.png`),
}

const undraw = {
  buildingBlocks: require(`../assets/images/undraw_building_blocks.png`),
  calendar: require(`../assets/images/undraw_calendar.png`),
  chilling: require(`../assets/images/undraw_chilling.png`),
  dogWalking: require(`../assets/images/undraw_dog_walking.png`),
  graduation: require(`../assets/images/undraw_graduation.png`),
  notify: require(`../assets/images/undraw_notify.png`),
  peopleSearch: require(`../assets/images/undraw_people_search.png`),
  playfulCat: require(`../assets/images/undraw_playful_cat.png`),
  relaxation: require(`../assets/images/undraw_relaxation.png`),
  relaxingAtHome: require(`../assets/images/undraw_relaxing_at_home.png`),
  scrumBoard: require(`../assets/images/undraw_scrum_board.png`),
  studying: require(`../assets/images/undraw_studying.png`),
}

const font = {
  ...Feather.font,
  apercu: require(`../assets/fonts/somerandomfont.otf`),
  "apercu-bold": require(`../assets/fonts/somerandomfont-Bold.otf`),
  "apercu-light": require(`../assets/fonts/somerandomfont-Light.otf`),
}

export default {
  font,
  uclapi,
  undraw,
}
