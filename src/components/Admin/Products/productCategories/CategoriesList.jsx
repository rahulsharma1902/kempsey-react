import React, { useContext } from 'react';
import AdminLayout from '.././../AdminLayout';
const CategoriesList = () => {
  return (
    <AdminLayout>
      <div class="nk-block nk-block-lg">
        <div class="nk-block-head nk-block-head-sm">
          <div class="nk-block-between">
            <div class="nk-block-head-content">
              <h3 class="nk-block-title page-title">Categories</h3>
            </div>
            <div class="nk-block-head-content">
              <div class="toggle-wrap nk-block-tools-toggle">
                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em
                  class="icon ni ni-more-v"></em></a>
                <div class="toggle-expand-content" data-content="pageMenu">
                  <ul class="nk-block-tools g-3">

                    <li class="nk-block-tools-opt">
                      <a href="" class=" btn btn-icon btn-dark d-md-none"><em
                        class="icon ni ni-plus"></em></a>
                      <a href="" class=" btn btn-dark d-none d-md-inline-flex"><em
                        class="icon ni ni-plus"></em><span>Add Categorie</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-bordered card-preview">
          <div class="card-inner">
            <h4>Parent Categories</h4>
            <table class="datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
              <thead>
                <tr class="nk-tb-item nk-tb-head">
                  <th class="nk-tb-col">Sno.</th>
                  <th class="nk-tb-col"><span class="sub-text"> Name</span></th>
                  <th class="nk-tb-col"><span class="sub-text">Slug</span></th>
                  <th class="nk-tb-col tb-col-lg"><span class="sub-text">Display on front</span></th>
                  <th class="tb-tnx-action">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr class="nk-tb-item">
                  <td class="nk-tb-col">
                    <div class="user-card">
                      <div class="user-info">
                        <span class="tb-lead">dfsdf</span>

                      </div>
                    </div>
                  </td>
                  <td class="nk-tb-col">
                    <div class="user-card">
                      <div class="user-info">
                        <span class="tb-lead">sdfsdf</span>

                      </div>
                    </div>
                  </td>
                  <td class="nk-tb-col tb-col-mb">
                    <span class="tb-amount">sdf</span>
                  </td>

                  <td class="nk-tb-col tb-col-md p-3">
                    <input type="checkbox" class="display_onFront" name="display" checked />

                  </td>

                  <td class="nk-tb-col nk-tb-col-tools">
                    <ul class="nk-tb-actions gx-1">
                      <li>
                        <div class="drodown">
                          <a href="#" class="dropdown-toggle btn btn-icon btn-trigger"
                            data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <ul class="link-list-opt no-bdr">
                              <li><a href=""><em class="icon ni ni-eye"></em><span>Edit</span></a>
                              </li>
                              <li><a class="delete" href=""><em
                                class="icon ni ni-focus"></em><span>Remove</span></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default CategoriesList;