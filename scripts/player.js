var Utilities = BlocJams.Utilities;

(function() {
    function Player() {
        var Player = {};
        
        var currentVolume;
        var currentSoundFile;
        var currentSongRow;
        
        Player.currentSong = { 'number': null };
        Player.playing = false;
        Player.volume = 10;
        
        Player.currentSoundFile;
        Player.currentAlbum;
        
        var playSong = function() {
            Player.playing = true;
            Player.currentSoundFile.play();
            
            Player.currentSoundFile.bind('timeupdate', function(event) {
                var currentTime = this.getTime();
                var songLength = this.getDuration();
                PlayerBar.updateProgress(currentTime, songLength);
            });
        }
        
        var pauseSong = function() {
            Player.playing = false;
            Player.currentSoundFile.pause();
        }
        
        var changeSong = function(songNumber) {
            pauseSong();
            SongList.resetRowNumber(Player.currentSong.number);
            Player.setSong(songNumber);
        }

         Player.moveTo = function(time) {
             var newTime = seekBarFillRatio * Player.currentSoundFile.getDuration()
             Player.moveTo(newTime);
             Player.currentSoundFile.setTime(time);
         };
         
         Player.setSong = function(songNumber) {
             Player.currentSong = Player.currentAlbum.songs[songNumber - 1];
             Player.currentSong.number = songNumber;
             
             Player.currentSoundFile = new buzz.sound(Player.currentSong.audioUrl, {
                 formats: [ 'mp3' ],
                 preload: true
             });
         }

         Player.setVolume = function(volume) {
             Player.currentSoundFile.setVolume(volume);
             
             var $volumeFill = $('.volume .fill');
             var $volumeThumb = $('.volume .thumb');
             $volumeFill.width(currentVolume + '%');
             $volumeThumb.css({left: currentVolume + '%'});
         };
         
         Player.togglePlayPause = function() {
             if (Player.playing) {
                 pauseSong();
             } else {
                 playSong();
             }
         };

         Player.nextSong = function() { 
             var currentSongNumber = Player.currentSong.number;

             if (currentSongNumber >= Player.currentAlbum.songs.length) {
                 currentSongNumber = 1;
             } else {
                 currentSongNumber++;
             }
             
             changeSong(currentSongNumber);
             playSong();
         };

         Player.previousSong = function() {
             var currentSongNumber = Player.currentSong.number;

             if (currentSongNumber <= 1) {
                 currentSongNumber = Player.currentAlbum.songs.length;
             } else {
                 currentSongNumber--;
             }
             
             changeSong(currentSongNumber);
             playSong();
         };
         
         Player.setup = function(album) {
             Player.currentAlbum = album;
         };
         
         Player.update = function(songNumber) {
             if (Player.currentSong.number == null) {
                 Player.setSong(songNumber);
                 playSong();
             } else if (songNumber == Player.currentSong.number) {
                 pauseSong();
             } else if (songNumber != Player.currentSong.number) {
                 pauseSong();
                 changeSong(songNumber);
                 playSong();
             }
             console.log(Player.playing);
             
             PlayerBar.update();
             SongList.update(songNumber, Player.currentAlbum.songs);
         };

        return Player;
    }
    
    BlocJams.Player = Player();
})();
