const CalendarInit = {
  init() {
    if (typeof FullCalendar !== 'undefined') {
      this.calendar();
    }
  },

  calendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      events: [
        {
          title: 'Meeting with Team',
          start: new Date().setDate(new Date().getDate() + 1),
          backgroundColor: '#ff0038',
          borderColor: '#ff0038'
        },
        {
          title: 'Project Deadline',
          start: new Date().setDate(new Date().getDate() + 3),
          backgroundColor: '#10b981',
          borderColor: '#10b981'
        },
        {
          title: 'Client Presentation',
          start: new Date().setDate(new Date().getDate() + 5),
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6'
        },
        {
          title: 'Code Review',
          start: new Date().setDate(new Date().getDate() + 7),
          backgroundColor: '#f59e0b',
          borderColor: '#f59e0b'
        },
        {
          title: 'Team Building',
          start: new Date().setDate(new Date().getDate() + 10),
          backgroundColor: '#8b5cf6',
          borderColor: '#8b5cf6'
        },
        {
          title: 'Sprint Planning',
          start: new Date().setDate(new Date().getDate() + 12),
          backgroundColor: '#ec4899',
          borderColor: '#ec4899'
        },
        {
          title: 'Product Launch',
          start: new Date().setDate(new Date().getDate() + 15),
          backgroundColor: '#06b6d4',
          borderColor: '#06b6d4'
        },
        {
          title: 'All Hands Meeting',
          start: new Date().setDate(new Date().getDate() + 18),
          backgroundColor: '#84cc16',
          borderColor: '#84cc16'
        },
        {
          title: 'Design Review',
          start: new Date().setDate(new Date().getDate() + 20),
          backgroundColor: '#f97316',
          borderColor: '#f97316'
        },
        {
          title: 'Quarterly Review',
          start: new Date().setDate(new Date().getDate() + 25),
          backgroundColor: '#6366f1',
          borderColor: '#6366f1'
        }
      ],
      eventClick: function(info) {
        alert('Event: ' + info.event.title);
      },
      select: function(info) {
        alert('Selected: ' + info.start.toISOString().split('T')[0]);
        calendar.unselect();
      },
      eventDidMount: function(info) {
        info.el.setAttribute('data-bs-toggle', 'tooltip');
        info.el.setAttribute('title', info.event.title);
        
        if (typeof bootstrap !== 'undefined') {
          new bootstrap.Tooltip(info.el);
        }
      }
    });

    calendar.render();

    window.calendar = calendar;
  }
};

document.addEventListener('DOMContentLoaded', () => CalendarInit.init());