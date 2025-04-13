from django.http.response import JsonResponse

# Create your views here.
def home (request):
    return JsonResponse({'info':'django react course','name':'tarun'})