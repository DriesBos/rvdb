import Vue from "vue"
import Page from "~/components/Page.vue"
import Text from "~/components/Text.vue"
import Menu from "~/components/Menu.vue"
import Hyperlink from "~/components/Hyperlink.vue"
import ExpandableItem from "~/components/ExpandableItem.vue"
import ExpandableList from "~/components/ExpandableList.vue"
import Title from "~/components/Title.vue"
import NewsList from "~/components/NewsList.vue"
import NewsItem from "~/components/NewsItem.vue"

Vue.component("blok-page", Page)
Vue.component("blok-text", Text)
Vue.component("blok-menu", Menu)
Vue.component("blok-hyperlink", Hyperlink)
Vue.component("blok-expandable-item", ExpandableItem)
Vue.component("blok-expandable-list", ExpandableList)
Vue.component("blok-title", Title)
Vue.component("blok-news-list", NewsList)
Vue.component("blok-news-item", NewsItem)
