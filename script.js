$(document).ready(function(){                // when the DOM is ready
    var times;                              // declare global variable
    $.ajax({                                // Setup Request
        beforeSend: function(xhr){          // Before requesting data
            if(xhr.overrideMimeType){       // if suppoted
                xhr.overrideMimeType('application/json');   // set MIME to prevent errors
            }
        }
    });

    // FUNCTION TAHT COLLECTS DATA FROM THE JSON FILE
    function loadTimeTable() {              // Declare function 
        $.getJSON('data.json')              // Try to collect JSON data
        .done( function(data){              // If successful
            times = data;                   // Store it in a variable
        }).fail(function(){                 // If a problem: show mwssage
            $('#event').html('Sorry! We could not load the timetable at the moment');
        });
    }

    loadTimeTable();

    // CLICK ON THE EVENT TO LOAD A TIMETABLE
    $('#content').on('click', '#event a', function(e) {  // User clicks on place
        e.preventDefault();                 // Prevent loading page
        var loc = this.id.toUpperCase();     // get value of id attribute

        var newContent = '';                // To build up timetable
        for (let i = 0; i < times[loc].length; i++){ // loop through the sessions
            newContent += '<li><span class="time">' + times[loc][i].time + '</span>';
            newContent += '<a href="description.html#';
            newContent +=  times[loc][i].title.replace(/ /g, '-') + '">';
            newContent += times[loc][i].title + '</a></li>';
        }

        $('#sessions').html('<ul>' + newContent + '</ul>'); // Display time
    });

    $('#event a.current').removeClass('current');   // Update Selected link
    $(this).addClass('current');

    $('#details').text('');                 // Clear third column

    // CLICK ON A SESSION TO LOAD THE DESCRIPTION
    $('#content').on('click', '#sessions li a', function(e) {   // click on seesion
        e.preventDefault();                 // Prevent loading
        let fragment = this.href            // Title is in href

        fragment = fragment.replace('#', ' #'); // Add space before 
        $('#details').load(fragment);       // To load info

        $('#sessions a.current').removeClass('current');    // Update selected
        $(this).addClass('current');
    });

    // CLICK ON PRIMARY NAVIGATION
    $('nav a').on('click', function (e) {    // Click on nav
        e.preventDefault();                 
        const url = this.href                 //  Get URL to load

        $('nav a.current').removeClass('current');  // Update nav
        $(this).addClass('current');            

        $('#container').remove();           // Remove old
        $('#content').load(url + ' #container').hide().fadeIn('slow'); // Add new
    });
});
