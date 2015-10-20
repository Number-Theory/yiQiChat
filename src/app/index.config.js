(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($translateProvider) {
            $translateProvider.preferredLanguage('zh-CN');
        })

        .config(function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.latencyThreshold = 500;
            cfpLoadingBarProvider.spinnerTemplate = '<div id="Mc-loading-bar-spinner"><div class="spinner-icon"></div></div>';
            cfpLoadingBarProvider.loadingBarTemplate = '<div id="Mc-loading-bar"><div class="bar"><div class="peg"></div></div></div>';
        })

        .config(function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 5000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });
        })

        .config(function (RestangularProvider, env) {
            RestangularProvider.setBaseUrl(env.baseUrl);

            RestangularProvider.setDefaultHeaders({
                'X-Requested-With': 'XMLHttpRequest'
            });

            RestangularProvider.setResponseExtractor(function (response, operation) {
                var extractedData = {};

                if (response.data) {
                    extractedData = response.data;
                }

                _.forEach(response, function (val, key) {
                    if (key !== 'data') {
                        extractedData[key] = val;
                    }
                });

                if (operation === 'getList' && response.meta) {
                    extractedData.pagination = response.meta.pagination;
                }

                return extractedData;
            });
        })

        //添加拦截器
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('requestInterceptor');
            //$httpProvider.defaults.withCredentials = true;
        })
        .config(function (redactorOptions) {
            redactorOptions.plugins = ['fontcolor', 'editormode', 'definedlinks', 'fontfamily', 'fontsize', 'fullscreen'];
            redactorOptions.codemirror = true;
            redactorOptions.minHeight = 200;

            redactorOptions.buttons = ['formatting', 'bold', 'italic', 'deleted', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image', 'file', 'link', 'alignment', 'horizontalrule', 'underline'];
            //redactorOptions.activeButtons =  ['formatting', 'bold', 'italic', 'deleted', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image', 'file', 'link', 'alignment', 'horizontalrule','underline']
            redactorOptions.lang = 'zh';
            redactorOptions.langs = {
                zh: {
                    html: 'HTML代码',
                    video: '视频',
                    image: '图片',
                    table: '表格',
                    link: '链接',
                    link_insert: '插入链接',
                    link_edit: '编辑链接',
                    unlink: '取消链接',
                    formatting: '样式',
                    paragraph: '段落',
                    quote: '引用',
                    code: '代码',
                    header1: '一级标题',
                    header2: '二级标题',
                    header3: '三级标题',
                    header4: '四级标题',
                    header5: '五级标题',
                    bold: '粗体',
                    italic: '斜体',
                    fontcolor: '字体颜色',
                    backcolor: '背景颜色',
                    unorderedlist: '项目编号',
                    orderedlist: '数字编号',
                    outdent: '减少缩进',
                    indent: '增加缩进',
                    cancel: '取消',
                    insert: '插入',
                    save: '保存',
                    _delete: '删除',
                    insert_table: '插入表格',
                    insert_row_above: '在上方插入',
                    insert_row_below: '在下方插入',
                    insert_column_left: '在左侧插入',
                    insert_column_right: '在右侧插入',
                    delete_column: '删除整列',
                    delete_row: '删除整行',
                    delete_table: '删除表格',
                    rows: '行',
                    columns: '列',
                    add_head: '添加标题',
                    delete_head: '删除标题',
                    title: '标题',
                    image_position: '位置',
                    none: '无',
                    left: '左',
                    right: '右',
                    image_web_link: '图片网页链接',
                    text: '文本',
                    mailto: '邮箱',
                    web: '网址',
                    video_html_code: '视频嵌入代码',
                    file: '文件',
                    upload: '上传',
                    download: '下载',
                    choose: '选择',
                    or_choose: '或选择',
                    drop_file_here: '将文件拖拽至此区域',
                    align_left: '左对齐',
                    align_center: '居中',
                    align_right: '右对齐',
                    align_justify: '两端对齐',
                    horizontalrule: '水平线',
                    fullscreen: '全屏',
                    deleted: '删除',
                    anchor: '锚点',
                    link_new_tab: '在新窗口打开',
                    underline: '下划线',
                    alignment: '对齐方式',
                    filename: '文件名 (可选)',
                    edit: '编辑',
                    fontsize: '字体大小',
                    remove: '移除',
                    fontfamily: '字体'

                }
            };
        })
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('myApp')
                .setStorageType('localStorage')
                .setNotify(true, true)
        });

})();
