!(function(c) {
  var e,
    n =
      '<svg><symbol id="icon-guanbi" viewBox="0 0 1024 1024"><path d="M512 450.2016L294.7584 232.96a25.6 25.6 0 0 0-36.1984 36.1984L475.8016 486.4 258.56 703.6416a25.6 25.6 0 1 0 36.1984 36.1984L512 522.5984l217.2416 217.2416a25.6 25.6 0 1 0 36.1984-36.1984L548.1984 486.4l217.2416-217.2416a25.6 25.6 0 0 0-36.1984-36.1984L512 450.2016z" fill="#707070" ></path></symbol><symbol id="icon-rightpage" viewBox="0 0 1024 1024"><path d="M702.144 501.33333334L289.536 118.16533334a44.8 44.8 0 0 1 60.928-65.664l448 416a44.8 44.8 0 0 1 0 65.664l-448 416a44.8 44.8 0 1 1-60.928-65.664L702.08 501.33333334z" fill="#6A6A6A" ></path></symbol><symbol id="icon-ti-shi" viewBox="0 0 1024 1024"><path d="M6.092 511.71C6.092 232.648 232.358 6.382 511.42 6.382s505.328 226.266 505.328 505.328-226.266 505.328-505.328 505.328S6.092 790.772 6.092 511.71zM614.69 653.852c-13.344 0-64.399 76.002-92.247 76.002-7.542 0-11.023-6.382-11.023-12.764 0-14.504 10.443-36.55 15.664-49.895l67.3-174.05c33.65-86.446-9.283-109.653-49.314-109.653-53.956 0-102.69 26.108-139.821 59.758-12.184 11.603-42.353 56.857-42.353 73.681 0 5.802 5.802 12.184 12.184 12.184 16.825 0 50.475-87.025 85.285-87.025 7.542 0 15.664 8.122 9.283 24.367l-65.56 157.226c-6.381 15.084-38.29 67.3-38.29 110.232 0 33.65 23.206 70.2 56.856 70.2 94.568 0 203.64-110.812 203.64-136.34 0-8.702-6.963-13.923-11.604-13.923z m-18.565-434.548c-41.192 0-76.583 31.91-76.583 71.361 0 36.55 24.948 60.918 63.239 60.918 41.772 0 77.743-30.169 77.743-71.36 0-36.552-26.688-60.919-64.4-60.919z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[e.length - 1].getAttribute('data-injectcss')
  if (t && !c.__iconfont__svg__cssinject__) {
    c.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(e, 0)
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e()
        }
        document.addEventListener('DOMContentLoaded', t, !1)
      }
    else
      document.attachEvent &&
        ((n = e),
        (i = c.document),
        (o = !1),
        (l = function() {
          o || ((o = !0), n())
        }),
        (a = function() {
          try {
            i.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(a, 50)
          }
          l()
        })(),
        (i.onreadystatechange = function() {
          'complete' == i.readyState && ((i.onreadystatechange = null), l())
        }))
    var n, i, o, l, a
  })(function() {
    var e, t
    ;((e = document.createElement('div')).innerHTML = n),
      (n = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (function(e, t) {
          t.firstChild
            ? (function(e, t) {
                t.parentNode.insertBefore(e, t)
              })(e, t.firstChild)
            : t.appendChild(e)
        })(t, document.body))
  })
})(window)
