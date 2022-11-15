document.addEventListener('DOMContentLoaded', function () {


  const tabs = {
    container: '[data-tabs]',
    nav: '[data-tabs-nav]',
    navItem: '[data-tabs-nav-item]',
    navToggle: '[data-tabs-nav-toggle]',
    content: '[data-tabs-content]',
    contentItem: '[data-tabs-content-item]',

    handler: function ($this) {
      let $tab = $this;
      let $container = $tab.closest(this.container);
      let $navItem = $tab.closest(this.navItem);
      let $contentItem = $container.find(this.contentItem);
      let $index = $navItem.index();

      if($(window).width() < 768 && $navItem.hasClass('current')) {
        $contentItem.eq($index)
          .add($navItem)
          .removeClass('current')
          .siblings()
          .removeClass('current');
      } else {
        $contentItem.eq($index)
          .add($navItem)
          .addClass('current')
          .siblings()
          .removeClass('current');
      }
    }
  }

  const chars = {
    approve: false,
    value: '',
    $card: null,

    handler: function ($this, value) {

      /* записываем значение */
      if(!value) {
        this.value = $this.siblings('.input').val();
        this.$card = $this.closest('.card');
      }

      if (this.approve) {
        this.$card
          .find('.card-chars__list')
          .append('<li><span>' + value + '</span></li>');

        this.formReset();

        this.approve = false;
        this.value = '';
      } else {
        this.approoveBlockRender($this)
      }
    },

    approoveBlockRender: function ($this) {
      let $card = $this.closest('.card');

      $card.append(`
        <div class="card-approove">
          <button class="button js-chars-approove">Окей</button>
          <button class="button button--no-bg js-chars-cancel-approove">Отмена</button>
        </div>
      `)
    },

    removeApproveBlock: function () {
      this.approve = false;
      this.value = '';
      this.formReset();

      $('.card-approove').remove();
    },

    formReset: function () {
      this.$card.find('.form')[0].reset();
    }
  }

  $(document).on('click', '[data-tabs-nav-toggle]', function (e) {
    e.preventDefault();
    tabs.handler($(this));
  });

  $(document).on('click', '.js-add-char', function (e) {
    e.preventDefault();
    chars.handler($(this));
  })

  $(document).on('click', '.js-chars-approove', function (e) {
    e.preventDefault();

    chars.approve = true;
    chars.handler('', chars.value);

    chars.removeApproveBlock();
  })

  $(document).on('click', '.js-chars-cancel-approove', function () {
    chars.removeApproveBlock();
  })
});
