from django.conf.urls import patterns, include, url

from django.contrib.auth.views import login

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # User login
    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),

    # Examples:
    url(r'^widget/$', 'vline_example.views.widget', name='widget'),
    url(r'^vhelp.js$', 'vline_example.views.vhelpjs', name='vhelpjs'),
    url(r'^test.html$', 'vline_example.views.test', name='test'),
    url(r'^checkout.html$', 'vline_example.views.checkout', name='checkout'),


    url(r'^$', 'vline_example.views.home', name='home'),

    # url(r'^vline_example/', include('vline_example.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls))

)
