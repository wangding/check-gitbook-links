module.exports=function(s,e){var n,a=s.config.get("pluginsConfig").bsz;return Promise.all([(n=a.copyright,n)]).then(function(s){var n=s[0];return e.content+='<footer class="page-footer"><span class="page-footer-copyright">'+n+'</span><span class="page-footer-footer-update"><span id="busuanzi_container_site_uv">本站访客人数&nbsp;<span id="busuanzi_value_site_uv"></span>&nbsp;人次</span></span></footer><script>document.getElementsByClassName("bsz-this-year")[0].innerHTML = new Date().getFullYear(); <\/script><script async="" src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"><\/script>',e})};