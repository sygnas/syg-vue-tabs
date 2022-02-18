#!/bin/bash

cd /Users/dada/www/_caracol_works/javascript/npm/syg-vue-tabs_vue3
yarn build
cp -rf ./dist /Users/dada/www/_caracol_works/site_template/site_template_202101_vue3/node_modules/@sygnas/vue-tabs/
cd /Users/dada/www/_caracol_works/site_template/site_template_202101_vue3
yarn js
