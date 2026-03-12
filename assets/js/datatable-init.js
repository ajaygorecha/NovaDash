const DataTableInit = {
  init() {
    if (typeof $.fn.DataTable !== 'undefined') {
      this.usersTable();
      this.transactionsTable();
    }
  },

  usersTable() {
    const table = document.getElementById('usersTable');
    if (!table) return;

    $(table).DataTable({
      ajax: {
        url: 'https://jsonplaceholder.typicode.com/users',
        dataSrc: ''
      },
      columns: [
        {
          data: null,
          render: (data, type, row) => `
            <div class="d-flex align-items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=${row.id}" alt="${row.name}" class="avatar avatar-sm">
              <div>
                <div class="fw-semibold">${row.name}</div>
                <div class="text-muted small">${row.email}</div>
              </div>
            </div>
          `
        },
        { data: 'company.name' },
        { 
          data: 'address.city',
          render: (data) => data
        },
        { 
          data: null,
          render: (data, type, row) => {
            const statuses = ['Active', 'Inactive', 'Pending'];
            const status = statuses[row.id % 3];
            const colors = ['success', 'secondary', 'warning'];
            return `<span class="badge badge-${colors[row.id % 3]}">${status}</span>`;
          }
        },
        {
          data: null,
          render: () => `
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-icon btn-light" data-bs-toggle="tooltip" title="Edit">
                <i class="ri-edit-line"></i>
              </button>
              <button class="btn btn-sm btn-icon btn-light" data-bs-toggle="tooltip" title="Delete">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          `
        }
      ],
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      info: false,
      lengthMenu: [5, 10, 25, 50],
      pageLength: 10,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search users...',
        lengthMenu: '_MENU_ per page',
        emptyTable: 'No data available in table',
        zeroRecords: 'No matching records found'
      },
      dom: '<"row"<"col-sm-12"t>>ip',
      drawCallback: () => {
        $('[data-bs-toggle="tooltip"]').each(function() {
          new bootstrap.Tooltip(this);
        });
      }
    });
  },

  transactionsTable() {
    const table = document.getElementById('transactionsTable');
    if (!table) return;

    const transactionsData = [
      { id: '#TRX-001', user: 'John Doe', amount: '$1,250.00', status: 'Completed', date: '2024-01-15' },
      { id: '#TRX-002', user: 'Sarah Smith', amount: '$850.00', status: 'Pending', date: '2024-01-14' },
      { id: '#TRX-003', user: 'Mike Johnson', amount: '$2,100.00', status: 'Completed', date: '2024-01-14' },
      { id: '#TRX-004', user: 'Emily Brown', amount: '$450.00', status: 'Failed', date: '2024-01-13' },
      { id: '#TRX-005', user: 'David Wilson', amount: '$1,800.00', status: 'Completed', date: '2024-01-13' },
      { id: '#TRX-006', user: 'Lisa Anderson', amount: '$920.00', status: 'Completed', date: '2024-01-12' },
      { id: '#TRX-007', user: 'James Taylor', amount: '$1,450.00', status: 'Pending', date: '2024-01-12' },
      { id: '#TRX-008', user: 'Jennifer Martinez', amount: '$670.00', status: 'Completed', date: '2024-01-11' }
    ];

    $(table).DataTable({
      data: transactionsData,
      columns: [
        { data: 'id', className: 'fw-semibold' },
        { 
          data: 'user',
          render: (data) => `
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-sm bg-primary-light text-primary rounded-circle">${data.charAt(0)}</div>
              ${data}
            </div>
          `
        },
        { data: 'amount', className: 'fw-semibold' },
        { 
          data: 'status',
          render: (data) => {
            const colors = {
              'Completed': 'success',
              'Pending': 'warning',
              'Failed': 'danger'
            };
            return `<span class="badge badge-${colors[data]}">${data}</span>`;
          }
        },
        { data: 'date' }
      ],
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      info: false,
      lengthMenu: [5, 10, 25],
      pageLength: 5,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search transactions...',
        lengthMenu: '_MENU_ per page',
        emptyTable: 'No transactions found',
        zeroRecords: 'No matching records found'
      },
      dom: '<"row"<"col-sm-12"t>>ip'
    });
  }
};

document.addEventListener('DOMContentLoaded', () => DataTableInit.init());