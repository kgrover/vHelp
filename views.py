from django.template import RequestContext
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import vline
import time

@login_required
def home(request, template='home.html'):
    #calendar = get_object_or_404(Calendar, slug=calendar_slug)
    if request.user.is_authenticated():
        users = map(vline.create_user_profile, User.objects.all())
    else:
        users = None
    return render_to_response(template, {
        "users": users,
    }, context_instance=RequestContext(request))

def widget(request, template='widget.html'):
	#TODO: could create two same user ids if created in the same second
	userId = int(time.time())
	auth_token = vline.create_auth_token(userId)
	profile = vline.create_guest_profile(userId)
	return render_to_response(template, {
		"auth_token": auth_token,
		"profile": profile
    }, context_instance=RequestContext(request))

def vhelpjs(request, template='vhelp.js'):
	userId = int(time.time())
	auth_token = vline.create_auth_token(userId)
	profile = vline.create_guest_profile(userId)
	return render_to_response(template, {
		"auth_token": auth_token,
		"profile": profile
    }, context_instance=RequestContext(request))
def test(request, template = 'test.html'):
	return render_to_response(template, {}, context_instance=RequestContext(request))

def checkout(request, template='checkout.html'):
	return render_to_response(template, {}, context_instance=RequestContext(request))
