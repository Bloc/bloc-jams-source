(function() {
    function SongList() {
        var SongList = {};
        
        var $albumSongList = $('.album-view-song-list');
        
        var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
        var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
        
        SongList.currentSongRow;
        
        var buildSongRow = function(number, song) {
            template =  '<tr class="album-view-song-item">'
                 + '  <td class="song-item-number" data-song-number="' + number + '">' + number + '</td>'
                 + '  <td class="song-item-title">' + song.name + '</td>'
                 + '  <td class="song-item-duration">' + Utilities.filterTimeCode(song.length) + '</td>'
                 + '</tr>'
                 
            return $(template);
        }
        
        var getSongNumberCell = function(number) {
            return $('.song-item-number[data-song-number="' + number + '"]');   
        };
        
        var toggleSong = function() {
            // var songNumberCell = $(this).find('.song-item-number');
            var songNumber = parseInt($(this).attr('data-song-number'));
            
            Player.update(songNumber);
        };
        
        var onHover = function(event) {
            var songNumberCell = $(this).find('.song-item-number');
            var songNumber = parseInt(songNumberCell.attr('data-song-number'));
            // console.log(songNumbesr);
            
            if (!Player.playing) {
                songNumberCell.html(playButtonTemplate);
            } else if (Player.playing && Player.currentSong.number !== songNumber) {
                songNumberCell.html(playButtonTemplate);
            } else if (Player.playing && Player.currentSong.number == songNumber) {
                songNumberCell.html(pauseButtonTemplate);
            }
        };
        
        var offHover = function(event) {
            var songNumberCell = $(this).find('.song-item-number');
            var songNumber = parseInt(songNumberCell.attr('data-song-number'));
            
            if (songNumber !== Player.currentSong.number) {
                songNumberCell.html(songNumber);
            } 
        };
        
        var setEventHandlers =  function($row) {
            $row.find('.song-item-number').click(toggleSong);
            $row.hover(onHover, offHover);
            return $row;
        }
        
        SongList.build = function(songs) {
            $albumSongList.empty();
            
            for (i = 0; i < songs.length; i++) {
                var $newRow = buildSongRow(i + 1, songs[i]);
                setEventHandlers($newRow, Player);
                
                $albumSongList.append($newRow);
            }
        };
        
        SongList.resetRowNumber = function(songNumber) {
            SongList.currentSongRow = getSongNumberCell(songNumber);
            SongList.currentSongRow.html(songNumber)
        }
        
        SongList.update = function(songNumber, songs) {
            if (SongList.currentSongCell) {
                var previousSongCell = getSongNumberCell(songNumber - 1);
                var previousSongNumber = parseInt(SongList.currentSongCell.attr('data-song-number'));
                
                previousSongCell.html(previousSongNumber);
            }
            
            SongList.currentSongCell = getSongNumberCell(songNumber);
                
            if (Player.playing) {
                SongList.currentSongCell.html(playButtonTemplate);
            } else {
                SongList.currentSongCell.html(pauseButtonTemplate);
            }
        }

        return SongList;
    }
    
    BlocJams.SongList = SongList();
})();
