import Vue from "vue"
import AnchorNav from "~/components/AnchorNav.vue"
import ExpandableItem from "~/components/ExpandableItem.vue"
import ExpandableList from "~/components/ExpandableList.vue"
import Hyperlink from "~/components/Hyperlink.vue"
import Colofon from "~/components/Colofon.vue"
import Page from "~/components/Page.vue"
import PageBlog from "~/components/PageBlog.vue"
import Text from "~/components/Text.vue"

Vue.component("blok-anchor-nav", AnchorNav)
Vue.component("blok-expandable-item", ExpandableItem)
Vue.component("blok-expandable-list", ExpandableList)
Vue.component("blok-hyperlink", Hyperlink)
Vue.component("blok-colofon", Colofon)
Vue.component("blok-page", Page)
Vue.component("blok-page-blog", PageBlog)
Vue.component("blok-text", Text)
