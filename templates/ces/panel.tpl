<div class="ces" id="ces-main">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <a href="/ces" title="Ces">Ces</a>
            </h3>

            <div class="btn-group pull-right">
                <a href="#" class="ces-button-settings dropdown-toggle" data-toggle="dropdown">
                    <span class="fa fa-wrench"></span>
                </a>
                <ul class="ces-settings-menu dropdown-menu">
                    <li>
                        <a data-ces-setting="toggles.sound" href="#">
                            <span class="fa fa-check"></span> Sound
                        </a>
                    </li>
                    <li>
                        <a data-ces-setting="toggles.notification" href="#">
                            <span class="fa fa-check"></span> Notification
                        </a>
                    </li>
                    <li>
                        <a data-ces-setting="toggles.hide" href="#">
                            <span class="fa fa-check"></span> Hide
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="panel-body" style="{hiddenStyle}">
            <div class="ces-content-container">
                <div class="ces-content-overlay">
                    <a href="#" class="ces-content-overlay-close fa fa-times"></a>
                    <span class="ces-content-overlay-message"></span>
                </div>
                <div class="ces-content well well-sm"></div>
            </div>

            <div class="input-group">
                <input type="text" placeholder="enter message" name="ces-message" class="ces-message-input form-control">
                <span class="input-group-btn">
                    <button class="ces-message-send-btn btn btn-primary" type="button">Send</button>
                </span>
            </div>

            <!-- IF features.length -->
            <div class="ces-message-buttons">
                <!-- BEGIN features -->
                <!-- IF features.enabled -->
                <button type="button" class="ces-button-{features.id} btn btn-primary btn-xs">
                    <span class="fa {features.icon}"></span> {features.button}
                </button>
                <!-- ENDIF features.enabled -->
                <!-- END features -->
            </div>
            <!-- ENDIF features.length -->

            <div id="rupload" class="file-upload-btn hide" tabindex="-1">
                <i class="fa fa-upload"></i>
            </div>

            <form id="rfilesForm" method="post" enctype="multipart/form-data">
                <!--[if gte IE 9]><!-->
                    <input type="file" id="rfiles" name="rfiles[]" multiple class="gte-ie9 hide"/>
                <!--<![endif]-->
                <!--[if lt IE 9]>
                    <input type="file" id="rfiles" name="rfiles[]" class="lt-ie9 hide" value="Upload"/>
                <![endif]-->
            </form>

        </div>
    </div>
</div>