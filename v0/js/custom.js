$('a[rel=popover]').popover({
  html: true,
  trigger: 'hover',
  placement: 'right',
  content: function(){return '<img src="'+$(this).data('img') + '" />';}
});