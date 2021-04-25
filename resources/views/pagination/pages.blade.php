<?php if($paginator->hasPages()): ?>
    <nav>
        <ul class="pagination {{ theme("bg-darker", "bg-white") }}">

            <?php if($paginator->onFirstPage()): ?>
                <li class="page-item disabled" aria-disabled="true">
                    <span class="page-link {{ theme("bg-darker", "bg-white") }} border-page-dark"><?php echo app('translator')->get('pagination.previous'); ?></span>
                </li>
            <?php else: ?>
                <li class="page-item">
                    <a class="page-link {{ theme("bg-darker", "bg-white") }} border-page-dark" href="<?php echo e($paginator->previousPageUrl()); ?>" rel="prev"><?php echo app('translator')->get('pagination.previous'); ?></a>
                </li>
            <?php endif; ?>


            <?php if($paginator->hasMorePages()): ?>
                <li class="page-item">
                    <a class="page-link {{ theme("bg-darker", "bg-white") }} border-page-dark" href="<?php echo e($paginator->nextPageUrl()); ?>" rel="next"><?php echo app('translator')->get('pagination.next'); ?></a>
                </li>
            <?php else: ?>
                <li class="page-item disabled" aria-disabled="true">
                    <span class="page-link {{ theme("bg-darker", "bg-white") }} border-page-dark"><?php echo app('translator')->get('pagination.next'); ?></span>
                </li>
            <?php endif; ?>
        </ul>
    </nav>
<?php endif; ?>