# exec 1 | tee ${LOG_FILE}

#touch /media/danny/backup/music-room-media-rsync/log-Documents.txt
#touch  /media/danny/backup/music-room-media-rsync/log-Pictures.txt
#touch  /media/danny/backup/music-room-media-rsync/log-Music.txt
#touch  /media/danny/backup/music-room-media-rsync/log-Videos.txt

#mv /media/danny/backup/music-room-media-rsync/log-Documents.txt /media/danny/backup/music-room-media-rsync/log-Documents-previous.txt
#mv /media/danny/backup/music-room-media-rsync/log-Pictures.txt /media/danny/backup/music-room-media-rsync/log-Pictures-previous.txt
#mv /media/danny/backup/music-room-media-rsync/log-Music.txt /media/danny/backup/music-room-media-rsync/log-Music-previous.txt
#mv /media/danny/backup/music-room-media-rsync/log-Videos.txt /media/danny/backup/music-room-media-rsync/log-Videos-previous.txt


#rsync -av Pictures /media/danny/backup/music-room-media-rsync | tee /media/danny/backup/log-Pictures.txt
#rsync -av Music /media/danny/backup/music-room-media-rsync | tee /media/danny/backup/log-Music.txt
#rsync -av Videos /media/danny/backup/music-room-media-rsync | tee /media/danny/backup/log-Videos.txt

# rsync -av /home/danny/Documents /wheel2/backup-desktop_2024/ | tee /wheel2/backup-desktop_2024/log-Documents.txt

# rsync -av /home/danny/Documents /media/danny/backup/documents-desktop-rsync-2024/ | tee /media/danny/backup/log-Documents.txt

### Other drive
rsync -av /home/danny/BACKUP /space/data-dumps-desktop_rsync-2024/ 
rsync -av /home/danny/Documents /space/documents-desktop-rsync-2024/ 
rsync -av /home/danny/Music /space/music-desktop_rsync-2024/
rsync -av /home/danny/Pictures /space/pictures-desktop_rsync-2024/
rsync -av /home/danny/Videos /space/videos-desktop_rsync-2024/

### Patriot stick
rsync -av /home/danny/Documents /media/danny/stuff/documents-desktop-rsync-2024/
rsync -av /home/danny/BACKUP /media/danny/stuff/data-dumps_rsync-2024/

