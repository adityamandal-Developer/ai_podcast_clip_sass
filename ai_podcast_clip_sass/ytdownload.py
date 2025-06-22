from pytubefix import YouTube
from pytubefix.cli import on_progress
import os


url1 = "https://youtu.be/P4RN0Giug7Q?si=0Q5Bedri8d4H0_ag"
url2 = "https://youtu.be/LMoi4A2RexE?si=7PPZQTfyiqWM1pMC"
url3 = "https://youtu.be/wzoYv--roqc?si=-7AKdykr5kx5AeTJ"

yt = YouTube(url3, on_progress_callback=on_progress)
print(yt.title)

video_stream = yt.streams.filter(
    res="1080p", file_extension="mp4", only_video=True
).first()
audio_stream = (
    yt.streams.filter(only_audio=True, file_extension="mp4")
    .order_by("abr")
    .desc()
    .first()
)

video_path = video_stream.download(filename="video.mp4")
audio_path = audio_stream.download(filename="audio.mp4")

output_path = "output_1080p.mp4"
os.system(
    f'ffmpeg -y -i "{video_path}" -i "{audio_path}" -c:v copy -c:a aac "{output_path}"'
)

print(f"Downloaded and merged 1080p video to {output_path}")
