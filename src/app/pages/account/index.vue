<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title"
          slot="heading"
      >
        My Account
      </h1>
      <div slot="body">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
            <th>
              Email
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {{$store.state.account.firstName}}
            </td>
            <td>
              {{$store.state.account.lastName}}
            </td>
            <td>
              {{$store.state.account.email}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer">
        Made with love by Vivid Web
      </div>
    </v-panel>
  </v-layout>
</template>

<script>
  /* ============
   * Account Index Page
   * ============
   *
   * Page where the user can view the account information.
   */

  import VLayout from '@/layouts/minimal.vue';
  import VPanel from '@/components/panel.vue';

  export default {
    components: {
      VLayout,
      VPanel
    },
  };
</script>
