!(function(c) {
  var e,
    n =
      '<svg><symbol id="icon-guanbi" viewBox="0 0 1024 1024"><path d="M512 450.2016L294.7584 232.96a25.6 25.6 0 0 0-36.1984 36.1984L475.8016 486.4 258.56 703.6416a25.6 25.6 0 1 0 36.1984 36.1984L512 522.5984l217.2416 217.2416a25.6 25.6 0 1 0 36.1984-36.1984L548.1984 486.4l217.2416-217.2416a25.6 25.6 0 0 0-36.1984-36.1984L512 450.2016z" fill="#707070" ></path></symbol><symbol id="icon-rightpage" viewBox="0 0 1024 1024"><path d="M702.144 501.33333334L289.536 118.16533334a44.8 44.8 0 0 1 60.928-65.664l448 416a44.8 44.8 0 0 1 0 65.664l-448 416a44.8 44.8 0 1 1-60.928-65.664L702.08 501.33333334z" fill="#6A6A6A" ></path></symbol></svg>',
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
        (o = c.document),
        (i = !1),
        (a = function() {
          i || ((i = !0), n())
        }),
        (l = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(l, 50)
          }
          a()
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), a())
        }))
    var n, o, i, a, l
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
