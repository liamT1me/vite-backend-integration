
Vue.component('vue-scroll', {  //滚动加载组件
    props: {
        is_doc: {//div局部滚动  还是文档流滚动 默认不是文档流滚动
            type: Boolean,
            default: false
        },
        show_load: {//是否显示底部加载文字提示
            type: Boolean,
            default: true
        },
        loading_text: {//加载提示的文字
            type: String,
            default: '正在加载...',
        },
        has_more: {//是否还有更多数据
            type: Boolean,
            default: true
        },
        loading: {//加载中  控制重复加载
            type: Boolean,
            default: false,
        }
    },
    data: function () {
        return {
            scrollTop: 0
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.init()
        })
    },
    methods: {
        init: function () {
            if (this.is_doc) {
                window.addEventListener("scroll", this.getMore, false)
            }else {
                this.$refs.loadMore.addEventListener("scroll", this.getMore, false)
            }
        },
        getMore: function (event) {
            var scrollTop = 0;
            var clientHeight = 0;
            var scrollHeight = 0;


            if (!this.is_doc) {
                var el = event.currentTarget;
                scrollTop = el.scrollTop;
                clientHeight = el.clientHeight;
                scrollHeight = el.scrollHeight;
            }else {
                scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                scrollHeight = Math.min(document.body.scrollHeight, document.documentElement.scrollHeight);
            }
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!this.loading) {
                    this.$emit('load_data')
                }
            }
        }
    },
    template: '<div class="load_more" ref="loadMore">' +
        '<slot></slot>' +
        '<div v-if="show_load" class="loading-text">' +
        '{{ loading_text }}' +
        '<i v-if="has_more" class="loading-icon"></i>' +
        '</div>' +
        '</div>'
})