from pytubefix import YouTube
from pytubefix.cli import on_progress

url1="https://youtu.be/P4RN0Giug7Q?si=0Q5Bedri8d4H0_ag"
url2="https://youtu.be/LMoi4A2RexE?si=7PPZQTfyiqWM1pMC"
url3="https://youtu.be/wzoYv--roqc?si=-7AKdykr5kx5AeTJ"

yt = YouTube(url3, on_complete_callback=on_progress)
print(yt.title)

ys = yt.streams.get_highest_resolution()
ys.download()